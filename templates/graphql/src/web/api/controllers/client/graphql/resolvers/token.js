const _ = require('lodash');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const field = {
  type: GraphQLString,
  args: {
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  },
  resolve: async (root, args, context, info) => {
    const rs = await sails.helpers.serviceFactory(sails.config.constants.infrastructure.Modules.Identities, info.fieldName, args);
    const claim = {
      id: rs.id,
      email: rs.email,
      roles: _.join(_.map(rs.roles, 'name'), ',')
    };
    const token = await sails.helpers.generateJwt.with(claim);
    return token;
  }
};

module.exports = field;
