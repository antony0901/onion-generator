const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Generate JWT',
  description: 'Returns a JWT token',
  inputs: {
    id: {
      type: 'string',
      friendlyName: 'User ID',
      description: 'The user logged in ID',
      required: true
    },
    email: {
      type: 'string',
      friendlyName: 'User`s Email',
      required: false
    },
    roles: {
      type: 'string',
      friendlyName: 'User`s Email',
      required: true
    },
    tenantName: {
      type: 'string',
      required: false
    }
  },

  fn: (inputs, exits) => {
    var token = jwt.sign({
      id: inputs.id,
      email: inputs.email,
      roles: inputs.roles,
      tenant: inputs.tenantName
    }, sails.config.custom.jwtSecret, {
      expiresIn: sails.config.custom.jwtExpiry
    });
    return exits.success(token);
  }
};
