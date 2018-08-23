const t = require('tcomb');

const Role = t.struct({
  id: t.maybe(t.String),
  name: t.String,
  description: t.maybe(t.String),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
});

module.exports = Role;