const Common = require('../../../common');
const _ = require('lodash');

module.exports = {
  friendlyName: 'Get Token',
  description: 'Get JWT',
  inputs: {
    email: {
      friendlyName: 'email',
      description: 'email that the request belong to',
      type: 'string',
      required: true
    },
    password: {
      friendlyName: 'password',
      description: 'password that the request belong to',
      type: 'string',
      required: true
    },
    metadata: {
      type: 'ref',
      required: true
    }
  },

  exits: {
    serverError: {
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    const service = await sails.helpers.serviceFactory(sails.config.constants.infrastructure.Modules.Identities,
      sails.config.constants.infrastructure.Services.Identity);

    service.doPassword({
      email: inputs.email,
      password: inputs.password
    }).then(async (rs) => {
      const claim = {
        id: rs.id,
        email: rs.email,
        roles: _.join(_.map(rs.roles, 'name'), ',')
      };
      const token = await sails.helpers.generateJwt.with(claim);
      return exits.success(new Common.ResAsObj(token));
    }).catch(async (err) => {
      const msg = await sails.helpers.extractErrorMsg(err);
      return exits.serverError(new Common.ResAsMsg(true, msg));
    });
  }
};
