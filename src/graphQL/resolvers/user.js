const { GraphQLList, GraphQLID } = require("graphql");
const UserType = require("../types/user.js");
const UserController = require("../../controllers/userController.js");

const userResolvers = {
  getUser: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }) => {
      try {
        return await UserController.getUserById(id);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  getAllUsers: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      try {
        return await UserController.getAllUsers();
      } catch (error) {
        throw new Error("Internal server error");
      }
    },
  },
};

module.exports = userResolvers;
