const Sequelize = require('sequelize');
function Database() {
  const sequelize = new Sequelize(sails.config.custom.database, sails.config.custom.user, sails.config.custom.password, {
    host: sails.config.custom.host,
    pool: {
      max: 100,
      min: 1,
      acquire: 30000,
      idle: 30000
    },
    operatorsAliases: false,
    dialect: 'mysql'
  });

  return sequelize;
}

module.exports = {
  Database
};
