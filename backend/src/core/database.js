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
  host: process.env.DB_MASTER_HOST,
  user: process.env.DB_MASTER_USER,
  password: process.env.DB_MASTER_PASSWORD,
  database: process.env.DB_MASTER_NAME,
  port: process.env.DB_MASTER_PORT || 3306,
});

const slaveConnection = mysql.createPool({
  host: process.env.DB_SLAVE_HOST,
  user: process.env.DB_SLAVE_USER,
  password: process.env.DB_SLAVE_PASSWORD,
  database: process.env.DB_SLAVE_NAME,
  port: process.env.DB_SLAVE_PORT || 3306,
});

export { masterConnection, slaveConnection };
