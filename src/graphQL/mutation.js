const { GraphQLObjectType } = require("graphql");
const userMutations = require("./mutations/user.js");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: userMutations.createUser,
    updateUser: userMutations.updateUser,
    deleteUser: userMutations.deleteUser,
  },
});

module.exports = mutation;
