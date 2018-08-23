const t = require('tcomb');

const User = t.struct({
  id: t.maybe(t.String),
  name: t.maybe(t.String),
  email: t.String,
  password: t.maybe(t.String),
  loginProvider: t.maybe(t.String),
  loginKey: t.maybe(t.String),
  isExternalUser: t.maybe(t.Boolean),
  isActive: t.maybe(t.Boolean),
  roles: t.maybe(t.Array),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
});

module.exports = User;
