const { GraphQLObjectType, GraphQLString } = require("graphql");

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: {
    success: { type: GraphQLString },
    error: { type: GraphQLString },
  },
});

module.exports = MessageType;
