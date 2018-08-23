const awilix = require('awilix');
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

const services = require('../usecases');
const DbContext = require('../interfaces/database');
const dbconfig = require('./config/database-config');
const logConfig = require('./config/logger-config');

container.register({
  apiKey: awilix.asValue(sails.config.custom.nexmoApiKey),
  apiSecret: awilix.asValue(sails.config.custom.nexmoApiSecret),
  appId: awilix.asValue(sails.config.custom.nexmoAppId),
  
  db: awilix.asClass(dbconfig.Database).singleton(),
  dbContext: awilix.asClass(DbContext).singleton(),

  logger: awilix.asFunction(logConfig.createLogger).scoped(),
  servicesFactory: awilix.asClass(services).scoped(),
});

module.exports = container;
