require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  },
  migrations: {
    directory: "./src/database/migrations",
    tableName: "knex_migrations",
  },
};
