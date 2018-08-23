const repoFactory = require('../repositories');

class UnitOfWork {
  constructor(dbContext) {
    this.dbContext = dbContext;
    this.transaction = null;
  }

  getRepository({
    moduleName,
    repoName
  }) {
    return repoFactory.create({
      module: moduleName,
      name: repoName,
      dbContext: this.dbContext,
      transaction: this.transaction
    });
  }

  /**
   * Open a new transaction to handle commit or rollback automically
   * @param {Promise} callback a callback to be fired once a new transaction opened.
   */
  open(callback) {
    return this.dbContext.db.transaction((t) => {
      this.transaction = t;
      return callback(t).catch((err) => {
        throw err;
      });
    }).catch((err) => {
      throw err;
    });
  }
}

module.exports = UnitOfWork;