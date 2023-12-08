const { GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const MessageType = require("../types/message.js");
const UserController = require("../../controllers/userController.js");

const userMutations = {
  createUser: {
    type: MessageType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      cpf: { type: GraphQLInt },
      phone: { type: GraphQLString },
      password_hash: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      try {
        // await UserController.createUser(args);
        return { success: "User created successfully.", error: false };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  },
  updateUser: {
    type: MessageType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      cpf: { type: GraphQLInt },
      phone: { type: GraphQLString },
      password_hash: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      try {
        await UserController.updateUser(args);
        return { success: "User updated successfully.", error: false };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  },
  deleteUser: {
    type: MessageType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (_, { id }) => {
      try {
        await UserController.deleteUser(id);
        return { success: "User deleted successfully.", error: false };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  },
};

module.exports = userMutations;
