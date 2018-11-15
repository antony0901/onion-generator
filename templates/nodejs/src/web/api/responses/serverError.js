var nodemailer = require('nodemailer');
const Errors = require('../../../infrastruture/common/errors');
const ValidationErrors = require('../validators/validation-msg');
const container = require('../../container');

/**
 * serverError.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.serverError();
 *     // -or-
 *     return res.serverError(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'serverError'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

const getTrace = (err) => {
  return err.stack || err.message.stack;
};

const handleError = async (logger, err) => {
  const trace = getTrace(err);
  logger.error(trace);
  process.exit(1);
};

module.exports = async function serverError(optionalData) {
  // Get access to `req` and `res`
  let req = this.req;
  let res = this.res;
  container.createScope();
  const logger = container.resolve('logger');

  process.on('unhandledRejection', (reason, p) => {
    throw reason;
  });

  process.on('uncaughtException', (error) => {
    //I just received an error that was never handled, time to handle it and then decide whether a restart is needed
    handleError(logger, error);
  });
  if (optionalData && (Errors[optionalData.message] || ValidationErrors[optionalData.message])) {
    return res.status(400).send(optionalData);
  }

  const tsFormat = () => {
    return `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`;
  };

  logger.error(`****************NEW ERROR ${tsFormat()}**************`);

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    logger.error('Error is underfined');
    if (process.env.NODE_ENV === 'production') {
      handleError(logger, 'Error is underfined');
    }
    return res.sendStatus(500);
  } else {
    if (process.env.NODE_ENV === 'production') {
      handleError(logger, optionalData);
      return res.sendStatus(500);
    } else {
      logger.error(getTrace(optionalData));
      return res.status(500).send(getTrace(optionalData));
    }
  }
};
