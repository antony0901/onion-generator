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
    if (inputs.tenantId) {
      const keys = [
        sails.config.constants.infrastructure.ServiceAgents.CustomerManagementSystem,
        sails.config.constants.infrastructure.ServiceAgents.ContentManagementSystem,
        sails.config.constants.infrastructure.ServiceAgents.PolicyManagementSystem,
        sails.config.constants.infrastructure.ServiceAgents.WealthManagementSystem,
      ];

      await sails.helpers.tenantSettingsLoader.with({
        tenantId: inputs.tenantId,
        keys: keys
      }).switch({
        error: async (err) => {
          return exits.error(err);
        },
        success: (rs) => {
          container.createScope();
          const serviceFactory = container.resolve('servicesFactory');
          serviceFactory.addTenantSettings(rs);
          return exits.success(serviceFactory.create({
            module: inputs.module,
            name: inputs.name
          }));
        }
      });
    } else {
      container.createScope();
      const serviceFactory = container.resolve('servicesFactory');

      return exits.success(serviceFactory.create({
        module: inputs.module,
        name: inputs.name,
        tenantSettings: undefined
      }));
    }
  }
};
