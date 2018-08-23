var jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',
  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    }
  },
  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: async function (inputs, exits) {
    let req = inputs.req;
    if (req.header('authorization')) {
      const token = req.header('authorization').split('Bearer ')[1];
      if (!token) {
        return exits.invalid();
      }

      return jwt.verify(token, sails.config.custom.jwtSecret, async function (err, payload) {
        if (err || !payload.id) {
          return exits.invalid();
        }

        req.tokenPayload = payload;
        req.token = token;
        return exits.success(req);
      });
    }

    return exits.invalid();
  }
}
