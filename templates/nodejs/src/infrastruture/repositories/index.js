function create({
  module,
  name,
  dbContext,
  transaction
}) {
  const Repository = require(`./${module}/${name}`);
  return new Repository(dbContext, transaction);
}

module.exports.create = create;