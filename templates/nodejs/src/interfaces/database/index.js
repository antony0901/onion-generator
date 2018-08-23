class DbContext {
  constructor(opt) {
    this.db = opt.db;
  }
  
  get User() {
    const User = require('./entities/identities/user')(this.db);
    const Role = require('./entities/identities/role')(this.db);
    const UserRole = require('./entities/identities/user-role')(this.db);

    User.belongsToMany(Role, {
      through: UserRole,
      foreignKey: 'userId'
    });
    
    return User;
  }

  get Role() {
    return require('./entities/identities/role')(this.db);
  }

  get UserRole() {
    return require('./entities/identities/user-role')(this.db);
  }
}

module.exports = DbContext;
