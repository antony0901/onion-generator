const BaseRepository = require('../base-repository');
class RoleRepository extends BaseRepository {
  constructor({
    Role
  }, transaction) {
    super(Role, transaction);
  }
}

module.exports = RoleRepository;