const { GraphQLObjectType } = require("graphql");
const { createUser, updateUser, deleteUser } = require("./mutations/user.js");
const { login } = require("./mutations/auth.js");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    updateUser,
    deleteUser,
    login,
  },
});

module.exports = mutation;
