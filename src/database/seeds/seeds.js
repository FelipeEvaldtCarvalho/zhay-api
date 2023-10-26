const users = require("./mocks/users");
const addresses = require("./mocks/addresses");
const categories = require("./mocks/categories");
const products = require("./mocks/products");
const productImages = require("./mocks/productImages");
const productsCategories = require("./mocks/productsCategories");
const variants = require("./mocks/variants");
const variantProduct = require("./mocks/variantProduct");
const carts = require("./mocks/carts");
const cartItems = require("./mocks/cartItems");
const orders = require("./mocks/orders");
const orderStatuses = require("./mocks/orderStatuses");
const orderDetails = require("./mocks/orderDetails");
const ratings = require("./mocks/ratings");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert(await users());
  await knex("addresses").del();
  await knex("addresses").insert(addresses);
  await knex("categories").del();
  await knex("categories").insert(categories);
  await knex("products").del();
  await knex("products").insert(products);
  await knex("product_images").del();
  await knex("product_images").insert(productImages);
  await knex("products_categories").del();
  await knex("products_categories").insert(productsCategories);
  await knex("variants").del();
  await knex("variants").insert(variants);
  await knex("variant_product").del();
  await knex("variant_product").insert(variantProduct);
  await knex("carts").del();
  await knex("carts").insert(carts);
  await knex("cart_items").del();
  await knex("cart_items").insert(cartItems);
  await knex("order_statuses").del();
  await knex("order_statuses").insert(orderStatuses);
  await knex("orders").del();
  await knex("orders").insert(orders);
  await knex("order_details").del();
  await knex("order_details").insert(orderDetails);
  await knex("ratings").del();
  await knex("ratings").insert(ratings);
};
