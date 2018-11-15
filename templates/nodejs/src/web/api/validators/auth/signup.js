const Joi = require('joi');
const msg = require('../validation-msg');

const schema = Joi.object().keys({
  username: Joi.string().required().error(new Error(msg.USERNAME_IS_REQUIRED)),
  password: Joi.string().required().error(new Error(msg.PASSWORD_IS_REQUIRED)),
});

module.exports = schema;
