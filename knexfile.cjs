require("dotenv").config();
const path = require("path");

console.log("./src/database/migrations");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  production: {
    client: "mysql2",
    connection: {
      host: process.env.DATABASE_HOST,
      port: 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
    },
  },
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DATABASE_HOST,
      port: 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
    },
  },
};
