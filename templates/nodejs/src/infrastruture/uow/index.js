const UnitOfWork = require('./uow');

function create(dbContext) {
  return new UnitOfWork(dbContext);
}

module.exports.create = create;
