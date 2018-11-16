'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: 'db',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  'dialect': 'mysql'
});

console.log('Migration begins...');

const migrationPath = path.resolve(__dirname, 'sql');
const migrationFiles = fs
  .readdirSync(migrationPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === 'sql');
  });
const promises = [];
migrationFiles.forEach(file => {
  const promise = sequelize.query(`SELECT COUNT(*) as count FROM migrations WHERE name = '${file}'`, {
    type: sequelize.QueryTypes.SELECT
  }).spread((rs) => {
    if (rs && rs.count === 0) {
      return fs.readFile(path.resolve(migrationPath, file), {
        encoding: 'utf-8'
      }, (err, content) => {
        if (err) {
          throw err;
        }
        return sequelize.query(content, {
          type: sequelize.QueryTypes.RAW
        }).then(() => {
          return sequelize.query(`INSERT INTO migrations(id, name, createdAt) VALUES (UUID(), '${file}', now())`, {
            type: sequelize.QueryTypes.INSERT
          });
        });
      });
    }
  });

  promises.push(promise);
});

Promise.all(promises).then(() => {
  console.log('Migration completed...');
});