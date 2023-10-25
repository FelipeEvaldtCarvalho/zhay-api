const Model = require("./index.js");

const Order = new Model({
  name: "orders",
  tableName: "orders",
  selectableProps: ["id", "user_id", "address_id", "status"],
});

module.exports = Order;
