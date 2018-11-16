const joi = require('joi');

const validate = (moduleName, schemaName, payload) => {
  return new Promise((resolve, reject) => {
    const schema = require(`./${moduleName}/${schemaName}`);
    joi.validate(payload, schema, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

module.exports.validate = validate;
