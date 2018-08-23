class ServiceFactory {
  constructor({
    dbContext,
    logger
  }) {
    this.dbContext = dbContext;
    this.logger = logger;
  }

  create({
    module,
    name
  }) {
    const service = require(`./${module}/${name}`);
    return new service(this.dbContext, this.logger);
  }
}

module.exports = ServiceFactory;
