const Model = require("./index.js");

const User = new Model({
  name: "users",
  tableName: "users",
  selectableProps: ["id", "name", "email", "cpf", "phone", "password_hash"],
});

module.exports = User;
