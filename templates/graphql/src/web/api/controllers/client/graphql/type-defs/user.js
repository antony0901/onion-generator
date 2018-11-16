const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const User = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    name: {
      type: GraphQLString
    }
  }
});

module.exports = User;