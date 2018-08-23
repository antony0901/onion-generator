const doPassword = require('./do-password');
const logHandler = require('./log.js');

class IdentityServices {
  constructor(dbContext, logger) {
    this.dbContext = dbContext;
    this.logger = logger;
  }

  doPassword({
    email,
    password
  }) {
    return new Promise((resolve, reject) => {
      doPassword(this.dbContext, {
        tenantId,
        email,
        password
      }).then((user) => {
        logHandler.log(this.dbContext, {
          tenantId: tenantId,
          userId: user.id,
          metadata: metadata
        }).then(() => {
          resolve(user);
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = IdentityServices;
