const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const QueryRootType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    token: require('./resolvers/token')
  }
});

schema = new GraphQLSchema({
  query: QueryRootType
});

module.exports = schema;
