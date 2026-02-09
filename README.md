# VotePH

A real-time online voting system built with Express, Socket.IO, and Vite. The application supports live election voting with real-time vote count updates powered by WebSockets. It uses a publisher/subscriber architecture across multiple Socket.IO server instances, load balanced by HAProxy, with MySQL master-slave replication for database high availability.

## Architecture

```
                        ┌──────────────┐
                        │  User Client │
                        └──────┬───────┘
                               |
                               ▼
                        ┌──────────────┐
                        │   HAProxy    │ :80 (load balancer)
                        │  (roundrobin)│ :8404 (stats dashboard)
                        └──────┬───────┘
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
          ┌────────────┐┌────────────┐┌────────────┐
          │SocketServer││SocketServer││SocketServer│
          │ 1 (pub)    ││ 2 (sub)    ││ 3 (sub)    │
          │ :3000      ││ :3001      ││ :3002      │
          └─────┬──────┘└─────┬──────┘└─────┬──────┘
                └─────────────┼─────────────┘
                              ▼
                      ┌──────────────┐
                      │   Backend    │ :5000 (REST API)
                      └──────┬───────┘
                 ┌───────────┴───────────┐
                 ▼                       ▼
          ┌────────────┐          ┌────────────┐
          │ MySQL      │  ──────▶ │ MySQL      │
          │ Master     │ replicate│ Slave      │
          │ (read/write)│         │ (read-only)│
          └────────────┘          └────────────┘
```

- **HAProxy** — Round-robin load balancer with cookie-based session persistence and WebSocket support
- **Socket Servers** — One publisher + two subscribers that sync real-time vote updates across all connected clients
- **Backend API** — Express REST API handling authentication, elections, candidates, and voting
- **MySQL Master** — Handles all write operations (INSERT, UPDATE, DELETE)
- **MySQL Slave** — Read-only replica for SELECT queries, with binlog-based replication

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2)

### Installing Docker on WSL (Ubuntu)

```bash
sudo apt-get update && sudo apt-get install -y docker.io docker-compose-v2
sudo service docker start
sudo usermod -aG docker $USER
# Log out and log back in for group changes to take effect
```

## Setup and Run

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd gabriel-gallardo-salustiano-staana
   ```

2. **Run the build script**

   The `build.sh` script handles everything: building Docker images, starting MySQL master-slave replication, importing the database schema, configuring user privileges, and launching all services.

   ```bash
   chmod +x build.sh
   ./build.sh
   ```

   This will:
   - Build and start MySQL master and slave containers
   - Set up binlog-based master-slave replication
   - Import the database schema (`db/mysql_db.sql`)
   - Configure database user privileges (full access on master, read-only on slave)
   - Start the backend API, three socket servers, and HAProxy load balancer

3. **Access the application**

   | Service       | URL                          |
   | ------------- | ---------------------------- |
   | Application   | http://localhost             |
   | HAProxy Stats | http://localhost:8404        |
   | Backend API   | http://localhost:5000/api/v1 |

## Stopping the Application

```bash
# Stop all containers
docker compose down

# Stop and wipe database data (full reset)
docker compose down && rm -rf ./master/data ./slave/data
```

## Local Development (without Docker)

For development without Docker, you'll need Node.js 18+ and a local MySQL instance with `master` & `slave` users.

1. Install dependencies:

   ```bash
   npm install
   mysql -u root -p mydb < db/mysql_db.sql
   ```

2. Configure environment VITE variables in `frontend/.env` && `.env` and set up your database connection.

   ```bash
    ### DATABASE ###
    MASTER_DB_HOST=mysql_master
    MASTER_DB_USER=mydb_master_user
    MASTER_DB_PASS=mydb_master_pwd
    MASTER_DB_NAME=mydb
    MASTER_DB_PORT=3306

    SLAVE_DB_HOST=mysql_slave
    SLAVE_DB_USER=mydb_slave_user
    SLAVE_DB_PASS=mydb_slave_pwd
    SLAVE_DB_NAME=mydb
    SLAVE_DB_PORT=3306

    ### BACKEND ###
    API_HOST=localhost
    API_PORT=5000
    API_KEY=voteph

    ### FRONTEND ###
    HOST=localhost
    PORT=3000

    ### SOCKET IO ###
    SERVER_NAME=localhost
    PORTS=localhost:3000,localhost:3001,localhost:3002

    ### GOOGLE SECRET KEYS ### (OPTIONAL)
    GOOGLE_USER=
    GOOGLE_REDIRECT_URI=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GOOGLE_REFRESH_TOKEN=
    GOOGLE_ACCESS_TOKEN=
   ```

3. Start all services:

   ```bash
   npm run api
   npm start
   npm run dev:frontend (with hot refresh for frontend)
   ```

   This runs the backend API & Vite build, one publisher server on port 3000, and two subscriber servers on ports 3001 and 3002 concurrently.
