const { struct, maybe, String, Boolean } = require('tcomb');

const UserPayload = struct({
  id: maybe(String),
  name: maybe(String),
  email: maybe(String),
  password: maybe(String),
  isExternalUser: maybe(Boolean),
  loginProvider: maybe(String),
  loginKey: String,
});

module.exports = UserPayload;