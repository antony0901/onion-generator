const stringUtils = require('../infrastruture/utilities/string');

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

  run({
    module,
    name,
    args
  }) {
    const methodName = stringUtils.splitCamelCase(name);
    const method = require(`./${module}/${methodName}`);
    return method(this.dbContext, this.logger, args);
  }
}

module.exports = ServiceFactory;
