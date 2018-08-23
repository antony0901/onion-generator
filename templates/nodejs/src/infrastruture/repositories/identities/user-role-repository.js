const BaseRepository = require('../base-repository');
class RoleRepository extends BaseRepository {
  constructor({
    UserRole
  }, transaction) {
    super(UserRole, transaction);
  }
}

module.exports = RoleRepository;