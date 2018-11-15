const _ = require('lodash');
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
    filenames: {
      type: 'ref'
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
    const fileUrls = [];
    const promises = [];
    if (!_.isArray(inputs.filenames)) {
      return exits.invalid('MUST_BE_AN_ARRAY');
    }

    _.forEach(inputs.filenames, (item) => {
      const tmpFilePath = path.resolve(__dirname, '../../.tmp/uploads/', item);
      const promise = fileSystem.save(inputs.tenant, inputs.dir, tmpFilePath, item).then((savedFile) => {
        const params = `tenant=${inputs.tenant}&dir=${inputs.dir}&filename=${item}`;
        const fileUrl = `${inputs.req.baseUrl}/api/file?name=${hasher.encrypt(params)}`;

        fileUrls.push(fileUrl);
        return fileUrl;
      });

      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      exits.success(fileUrls);
    }).catch(err => {
      exits.invalid(err);
    });
  }
};
