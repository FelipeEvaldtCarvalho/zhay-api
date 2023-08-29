const { GraphQLObjectType } = require("graphql");
const userResolvers = require("./resolvers/user.js");

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser: userResolvers.getUser,
    getAllUsers: userResolvers.getAllUsers,
  },
});

module.exports = query;
