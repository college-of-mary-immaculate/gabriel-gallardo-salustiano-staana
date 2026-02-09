// backend/src/core/database.js
import mysql from "mysql2/promise";

// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306
// });

// export { connection };

const masterConnection = mysql.createPool({
  host: process.env.MASTER_DB_HOST,
  user: process.env.MASTER_DB_USER,
  password: process.env.MASTER_DB_PASS,
  database: process.env.MASTER_DB_NAME,
  port: process.env.MASTER_DB_PORT || 3306,
});

const slaveConnection = mysql.createPool({
  host: process.env.SLAVE_DB_HOST,
  user: process.env.SLAVE_DB_USER,
  password: process.env.SLAVE_DB_PASS,
  database: process.env.SLAVE_DB_NAME,
  port: process.env.SLAVE_DB_PORT || 3306,
});

export { masterConnection, slaveConnection };
