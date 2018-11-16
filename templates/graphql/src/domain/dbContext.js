class DbContext {
  constructor(opt) {
    this.db = opt.db;
  }
  
  get User() {
    const User = require('./identities/models/user')(this.db);
    const Role = require('./identities/models/role')(this.db);
    const UserRole = require('./identities/models/user-role')(this.db);

    User.belongsToMany(Role, {
      through: UserRole,
      foreignKey: 'userId'
    });
    
    return User;
  }

  get Role() {
    const Role = require('./identities/models/role')(this.db);
    return Role;
  }

  get UserRole() {
    const UserRole = require('./identities/models/user-role')(this.db);
    return UserRole;
  }
}

module.exports = DbContext;
