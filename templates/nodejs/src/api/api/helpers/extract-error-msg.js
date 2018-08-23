const _ = require('lodash');
const Errors = require('../../../infrastruture/common/errors');

module.exports = {
  friendlyName: 'Extract error message',
  description: 'Returns an error message from Error object.',
  inputs: {
    error: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: async function (inputs, exits) {
    const err = inputs.error;
    if(_.has(err, 'message')){
      const errMsg = err.message.replace(/Error:/g, '').trim();
      if(Errors[errMsg]){
        return exits.success(errMsg);
      }
    }
    
    return exits.success(inputs.error);
  }
};
