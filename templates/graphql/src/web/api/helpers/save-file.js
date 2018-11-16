const path = require('path');
const fileSystem = require('../../../infrastruture/utilities/filesystem');
const hasher = require('../../../infrastruture/helpers/hasher');

module.exports = {
  friendlyName: 'save file helper helps saving a file from temporary one.',
  description: 'Returns a absolute path of new file',
  inputs: {
    tenant: {
      type: 'string'
    },
    req: {
      type: 'ref'
    },
    filename: {
      type: 'string'
    },
    dir: {
      type: 'string'
    }
  },
  exits: {
    invalid: {
      description: 'An error occurs during saving file',
    }
  },

  fn: async function (inputs, exits) {
    const tmpFilePath = path.resolve(__dirname, '../../.tmp/uploads/', inputs.filename);
    fileSystem.save(inputs.tenant, inputs.dir, tmpFilePath, inputs.filename).then((savedFile) => {
      const params = `tenant=${inputs.tenant}&dir=${inputs.dir}&filename=${inputs.filename}`;
      const fileUrl = `${inputs.req.baseUrl}/api/file?name=${hasher.encrypt(params)}`;
      exits.success(fileUrl);
    }).catch(error => {
      exits.invalid(error);
    });
  }
};
