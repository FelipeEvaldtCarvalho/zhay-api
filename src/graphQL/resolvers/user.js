const { GraphQLList, GraphQLID } = require("graphql");
const UserType = require("../types/user.js");

const UserModel = require("../../models/index.js")({
  name: "users",
  tableName: "users",
  selectableProps: ["id", "name", "email", "cpf", "phone"],
});

const userResolvers = {
  getUser: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }) => {
      try {
        const [user] = await UserModel.find({ id });
        if (!user) {
          console.log("User not found");
          return new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error("Internal server error");
      }
    },
  },
  getAllUsers: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      try {
        return await UserModel.findAll();
      } catch (error) {
        throw new Error("Internal server error");
      }
    },
  },
};

module.exports = userResolvers;
