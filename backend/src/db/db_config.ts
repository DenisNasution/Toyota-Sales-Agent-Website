import mysql, { PoolConnection, QueryError } from "mysql2";
const db = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = db;
// export  db;
