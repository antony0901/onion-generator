const Joi = require('joi');
const msg = require('../validation-msg');

const schema = Joi.object().keys({
  dateOfBirth: Joi.date().error(new Error(msg.INVALID_DATE)),
  idExpireDate: Joi.date().error(new Error(msg.INVALID_DATE)),
});

module.exports = schema;
