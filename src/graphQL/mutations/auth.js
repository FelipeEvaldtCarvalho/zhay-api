const { GraphQLString, GraphQLObjectType } = require("graphql");
const MessageType = require("../types/message.js");
const AuthController = require("../../controllers/authController.js");

const authMutations = {
  login: {
    type: MessageType,
    args: {
      email: { type: GraphQLString },
      password_hash: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      try {
        const { token, user } = await AuthController.login(args);
        return {
          success: "Login success",
          error: false,
          token,
          user: JSON.stringify(user),
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  },
};

module.exports = authMutations;
