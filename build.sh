#!/bin/bash

docker compose down
sudo rm -rf ./master/data/* ./master/data/.gitkeep
sudo rm -rf ./slave/data/* ./slave/data/.gitkeep
chmod 444 ./master/conf/mysql.conf.cnf
chmod 444 ./slave/conf/mysql.conf.cnf
docker compose build
docker compose up -d mysql_master mysql_slave

until docker exec mysql_master sh -c 'export MYSQL_PWD=111; mysql -u root -e ";"'
do
    echo "Waiting for mysql_master database connection..."
    sleep 4
done

priv_stmt='GRANT REPLICATION SLAVE ON *.* TO "mydb_slave_user"@"%" IDENTIFIED BY "mydb_slave_pwd"; FLUSH PRIVILEGES;'
docker exec mysql_master sh -c "export MYSQL_PWD=111; mysql -u root -e '$priv_stmt'"

until docker compose exec mysql_slave sh -c 'export MYSQL_PWD=111; mysql -u root -e ";"'
do
    echo "Waiting for mysql_slave database connection..."
    sleep 4
done

docker-ip() {
    docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$@"
}

MS_STATUS=`docker exec mysql_master sh -c 'export MYSQL_PWD=111; mysql -u root -e "SHOW MASTER STATUS"'`
CURRENT_LOG=`echo $MS_STATUS | awk '{print $5}'`
CURRENT_POS=`echo $MS_STATUS | awk '{print $6}'`

start_slave_stmt="RESET SLAVE;CHANGE MASTER TO MASTER_HOST='$(docker-ip mysql_master)',MASTER_USER='mydb_slave_user',MASTER_PASSWORD='mydb_slave_pwd',MASTER_LOG_FILE='$CURRENT_LOG',MASTER_LOG_POS=$CURRENT_POS; START SLAVE;"
start_slave_cmd='export MYSQL_PWD=111; mysql -u root -e "'
start_slave_cmd+="$start_slave_stmt"
start_slave_cmd+='"'
echo "$start_slave_cmd"
docker exec mysql_slave sh -c "$start_slave_cmd"

docker exec mysql_slave sh -c "export MYSQL_PWD=111; mysql -u root -e 'SHOW SLAVE STATUS \G'"
docker exec mysql_master sh -c "export MYSQL_PWD=111; mysql -u root mydb < /db/mysql_db.sql"

docker exec mysql_master sh -c "export MYSQL_PWD=111; mysql -u root -e 'SET sql_log_bin = 0; GRANT ALL PRIVILEGES ON mydb.* TO \"mydb_user\"@\"%\"; FLUSH PRIVILEGES; SET sql_log_bin = 1;'"
docker exec mysql_slave sh -c "export MYSQL_PWD=111; mysql -u root -e 'REVOKE ALL PRIVILEGES ON mydb.* FROM \"mydb_slave_user\"@\"%\"; GRANT SELECT ON mydb.* TO \"mydb_slave_user\"@\"%\"; FLUSH PRIVILEGES;'"

docker compose up backend socketserver1 socketserver2 socketserver3 loadbalancer