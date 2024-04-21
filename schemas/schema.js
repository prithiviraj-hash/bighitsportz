const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const RootQuery = require('../queries/rootQuery');
const Rootmutation = require('../mutations/mutation');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Rootmutation
});
