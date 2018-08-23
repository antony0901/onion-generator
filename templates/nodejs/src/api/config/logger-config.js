let Transport = require('winston-transport');
const _ = require('lodash');
const moment = require('moment');

function clone(obj) {
  var copy = Array.isArray(obj) ? [] : {};
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      copy[i] = obj[i].slice(0);
    } else if (obj[i] instanceof Buffer) {
      copy[i] = obj[i].slice(0);
    } else if (typeof obj[i] !== 'function') {
      copy[i] = obj[i] instanceof Object ? clone(obj[i]) : obj[i];
    } else if (typeof obj[i] === 'function') {
      copy[i] = obj[i];
    }
  }
  return copy;
}

require('winston/lib/winston/common').clone = clone;

Transport.prototype.normalizeQuery = function (options) { //
  options = options || {};

  // limit
  options.rows = options.rows || options.limit || 10;

  // starting row offset
  options.start = options.start || 0;

  // now
  options.until = options.until || new Date;
  if (typeof options.until !== 'object') {
    options.until = new Date(options.until);
  }

  // now - 24
  options.from = options.from || (options.until - (24 * 60 * 60 * 1000));
  if (typeof options.from !== 'object') {
    options.from = new Date(options.from);
  }

  // 'asc' or 'desc'
  options.order = options.order || 'desc';

  // which fields to select
  options.fields = options.fields;

  return options;
};
Transport.prototype.formatResults = function (results, options) {
  return results;
};


// refer to https://github.com/charles-zh/winston-mysql
/**
 * This is a MySQL transport module for winston.
 * https://github.com/winstonjs/winston
 * Notice: User should create a log table in MySQL first,
 * the default table fields are 'level', 'meta', 'message', 'timestamp'. But you can
 * use your custom table fields by setting: options.fields.
 * Example: options.fields = { level: 'mylevel', meta: 'metadata', message: 'source', timestamp: 'addDate'}
 * Two demo tables:
 * 
 CREATE TABLE `sys_logs_default` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `tenantId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
 `level` VARCHAR(16) NOT NULL,
 `message` VARCHAR(512) NOT NULL,
 `meta` VARCHAR(1024) NOT NULL,
 `timestamp` DATETIME NOT NULL,
 PRIMARY KEY (`id`));
 *
 CREATE TABLE `sys_logs_custom` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `tenantId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
 `mylevel` VARCHAR(16) NOT NULL,
 `source` VARCHAR(512) NOT NULL,
 `metadata` VARCHAR(512) NOT NULL,
 `addDate` DATETIME NOT NULL,
 PRIMARY KEY (`id`));
 */

const util = require('util');
const winston = require('winston');
const MySql = require('mysql2');

/**
 * @constructor
 * @param {Object} options      Options for the MySQL
 * @param {String} options.user Database username
 * @param {String} options.database Database name
 * @param {String} options.table  Database table for the logs
 * @param {Object} **Optional** options.fields Log object, set custom fields for the log table
 */
var mysql = function (options) {
  "use strict";
  //Please visit https://github.com/felixge/node-mysql#connection-options to get default options for mysql module
  this.options = options || {};

  if (!options.user) {
    throw new Error('The database username is required');
  }

  if (!options.database) {
    throw new Error('The database name is required');
  }

  if (!options.table) {
    throw new Error('The database table is required');
  }

  //check custom table fields
  if (!options.fields) {

    this.options.fields = {};
    //use default names
    this.fields = {
      level: 'level',
      meta: 'meta',
      message: 'message',
      timestamp: 'timestamp'
    };

  } else {

    //use custom table field names
    this.fields = {
      level: this.options.fields.level,
      meta: this.options.fields.meta,
      message: this.options.fields.message,
      timestamp: this.options.fields.timestamp
    };

  }

  //Create a connection poll
  this.pool = MySql.createPool(this.options);

};

// Inherit from `winston.Transport`.
util.inherits(mysql, winston.Transport);
//logger name in winston
mysql.prototype.name = 'mysql';
//getter
winston.transports.Mysql = mysql;

/**
 * @method log called by winston when to log somethings
 * @param level {string} Level in winston
 * @param message {string} Message in winston
 * @param meta  {Object} JSON object in winston
 * @param callback {function} callback when finished
 */
mysql.prototype.log = function (level, message, meta, callback) {
  "use strict";

  //save this
  var self = this;
  //run it in nextTick
  process.nextTick(function () {

    var pool = self.pool;

    pool.getConnection((err, connection) => {

      if (err) {
        return callback(err, null);
      }

      if (!meta.tenantId) {
        return callback('TENANT_ID_REQUIRED', null);
      }

      //connected
      //set log object
      var log = {};
      log['tenantId'] = meta.tenantId;
      log[self.fields.level] = level;
      log[self.fields.message] = message;
      log[self.fields.meta] = JSON.stringify(meta);
      log[self.fields.timestamp] = new Date();

      //Save the log
      connection.query('INSERT INTO ' + self.options.table + ' SET ?', log, (err, rows, fields) => {
        if (err) {
          return callback(err, null);
        }
        //finished
        connection.release();
        callback(null, true);
      });
    });
  });
};

function createLogger() {
  const tsFormat = () => ( new Date() ).toLocaleDateString() + ' - ' + ( new Date() ).toLocaleTimeString();

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: process.env.NODE_ENV === 'development' ? 'verbose' : 'info'
      }),
      new winston.transports.File({
        filename: 'combined.log',
        level: 'info'
      }),
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        timestamp: tsFormat,
      })
    ]
    // transports: [
    //   new mysql({
    //     host: sails.config.custom.host,
    //     user: sails.config.custom.user,
    //     password: sails.config.custom.password,
    //     database: sails.config.custom.database,
    //     table: 'sys_logs_default'
    //   })
    // ]
  });

  return logger;
}

module.exports = {
  createLogger
};
