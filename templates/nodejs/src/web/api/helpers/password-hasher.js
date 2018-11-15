const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Format welcome message',
  description: 'Return a personalized greeting based on the provided name.',
  inputs: {
    password: {
      type: 'string',
      required: true
    }
  },

  fn: (inputs, exits) => {
    const salt = bcrypt.genSaltSync(sails.config.custom.saltRound);
    const hashedPwd = bcrypt.hashSync(inputs.password, salt);
    return exits.success(hashedPwd);
  }
};
