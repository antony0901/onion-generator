const doPassword = require('./do-password');

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
        email,
        password
      }).then((user) => {
        resolve(user);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = IdentityServices;
