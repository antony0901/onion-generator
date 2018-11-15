const container = require('../../container');
module.exports = {
  friendlyName: 'A service factory resolver',
  description: 'Return a corresponding service regarding module and name of service.',
  inputs: {
    module: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    tenantId: {
      type: 'string',
      require: false
    },
  },
  exits: {

  },
  fn: async function (inputs, exits) {
    container.createScope();
    const serviceFactory = container.resolve('servicesFactory');

    return exits.success(serviceFactory.create({
      module: inputs.module,
      name: inputs.name
    }));
  }
};
