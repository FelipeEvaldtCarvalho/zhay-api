/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
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
    })
    .createTable("categories", (table) => {
      table.increments("id").primary();
      table.string("name");
    })
    .createTable("products", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("description");
      table.decimal("value", 10, 2);
    })
    .createTable("products_categories", (table) => {
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories");
      table.primary(["product_id", "category_id"]);
    })
    .createTable("variants", (table) => {
      table.increments("id").primary();
      table.string("name");
    })
    .createTable("variant_product", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table
        .integer("variant_id")
        .unsigned()
        .references("id")
        .inTable("variants");
      table.unique(["product_id", "variant_id"]).primary();
    })
    .createTable("carts", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users");
    })
    .createTable("cart_items", (table) => {
      table.increments("id").primary();
      table.integer("cart_id").unsigned().references("id").inTable("carts");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table
        .integer("variant_id")
        .unsigned()
        .references("id")
        .inTable("variants");
      table.integer("quantity").notNullable();
    })
    .createTable("orders", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses");
      table.string("status");
    })
    .createTable("order_statuses", (table) => {
      table.increments("id").primary();
      table.string("status_name");
    })
    .createTable("order_details", (table) => {
      table.increments("id").primary();
      table.integer("order_id").unsigned().references("id").inTable("orders");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table
        .integer("variant_id")
        .unsigned()
        .references("id")
        .inTable("variants");
      table.integer("quantity").notNullable();
      table.decimal("value", 10, 2);
    })
    .createTable("ratings", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("rating");
      table.string("comment");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .dropTable("users")
    .dropTable("addresses")
    .dropTable("categories")
    .dropTable("products")
    .dropTable("products_categories")
    .dropTable("variants")
    .dropTable("variant_product")
    .dropTable("carts")
    .dropTable("cart_items")
    .dropTable("orders")
    .dropTable("order_statuses")
    .dropTable("order_details")
    .dropTable("ratings");
};
