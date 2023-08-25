require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  },
  migrations: {
    directory: "./src/database/migrations",
    tableName: "knex_migrations",
  },
};
