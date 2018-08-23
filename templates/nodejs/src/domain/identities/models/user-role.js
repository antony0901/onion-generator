const t = require('tcomb');

const UserRole = t.struct({
  id: t.maybe(t.String),
  roleId: t.String,
  userId: t.String,
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
});

module.exports = UserRole;