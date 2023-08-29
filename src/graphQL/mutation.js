const { GraphQLObjectType } = require("graphql");
const userMutations = require("./mutations/user.js");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: userMutations.createUser,
  },
});

module.exports = mutation;
