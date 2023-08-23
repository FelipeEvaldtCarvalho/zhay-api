/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
      table.string("password_hash", 64);
      table.string("role");
      table.bigInteger("cpf").nullable();
      table.string("phone").nullable();
    })
    .createTable("addresses", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("street");
      table.string("city");
      table.string("state");
      table.bigInteger("cep");
      table.boolean("main").defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable("categories", function (table) {
      table.increments("id").primary();
      table.string("name");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("addresses");
};
