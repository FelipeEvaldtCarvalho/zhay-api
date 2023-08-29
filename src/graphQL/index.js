const { GraphQLSchema } = require("graphql");
const mutation = require("./mutation.js");
const query = require("./query.js");

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
