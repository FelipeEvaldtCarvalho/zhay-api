const Order = require("../models/order.js");

const OrderController = {
  async getOrderDetails(userId) {
    try {
      const query = await Order.select([
        "orders.id",
        "users.name as customerName",
        "addresses.id as addressId",
        "order_statuses.status_name as status",
      ])
        .innerJoin("users", "orders.user_id", "users.id")
        .innerJoin("addresses", "orders.address_id", "addresses.id")
        .innerJoin("order_statuses", "orders.status", "order_statuses.id")
        .where("users.id", userId);
      return query;
    } catch (e) {
      throw new Error(e);
    }
  },
};

module.exports = OrderController;
