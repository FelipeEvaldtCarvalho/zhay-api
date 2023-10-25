/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password_hash", 64).notNullable();
      table.string("role").notNullable();
      table.bigInteger("cpf").nullable().unique();
      table.string("phone").nullable();
    })
    .createTable("addresses", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
      table.string("street").notNullable();
      table.integer("number").notNullable();
      table.string("detail").notNullable();
      table.bigInteger("cep").notNullable();
      table.string("city").notNullable();
      table.string("district").notNullable();
      table.string("state").notNullable();
      table.boolean("main").defaultTo(false).notNullable();
    })
    .createTable("categories", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
    })
    .createTable("products", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description");
      table.decimal("value", 10, 2).notNullable();
      table.decimal("promotional_value", 10, 2);
      table.integer("quantity");
      table.string("code");
      table.decimal("weight", 10, 4);
      table.integer("dimension_length");
      table.integer("dimension_width");
      table.integer("dimension_height");
    })
    .createTable("product_images", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .notNullable()
        .onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("url").notNullable();
    })
    .createTable("products_categories", (table) => {
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories")
        .notNullable()
        .onDelete("CASCADE");
      table.primary(["product_id", "category_id"]);
    })
    .createTable("variants", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("variant_product", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("variant_id")
        .unsigned()
        .references("id")
        .inTable("variants")
        .notNullable()
        .onDelete("CASCADE");
      table.primary(["product_id", "variant_id"]);
    })
    .createTable("carts", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
    })
    .createTable("cart_items", (table) => {
      table.increments("id").primary();
      table
        .integer("cart_id")
        .unsigned()
        .references("id")
        .inTable("carts")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("variant_id")
        .unsigned()
        .references("id")
        .inTable("variants")
        .notNullable()
        .onDelete("CASCADE");
      table.integer("quantity").notNullable().notNullable();
    })
    .createTable("order_statuses", (table) => {
      table.increments("id").primary();
      table.string("status_name").notNullable();
    })
    .createTable("orders", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("status")
        .unsigned()
        .references("id")
        .inTable("order_statuses")
        .notNullable()
        .onDelete("CASCADE");
    })
    .createTable("order_details", (table) => {
      table.increments("id").primary();
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("variant_id")
        .unsigned()
        .references("id")
        .inTable("variants")
        .notNullable();
      table.integer("quantity").notNullable().notNullable();
      table.decimal("value", 10, 2).notNullable();
    })
    .createTable("ratings", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
      table.integer("rating").notNullable();
      table.string("comment");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .dropTable("cart_items")
    .dropTable("carts")
    .dropTable("order_details")
    .dropTable("orders")
    .dropTable("addresses")
    .dropTable("users")
    .dropTable("categories")
    .dropTable("products")
    .dropTable("products_categories")
    .dropTable("variants")
    .dropTable("variant_product")
    .dropTable("order_statuses")
    .dropTable("ratings");
};
