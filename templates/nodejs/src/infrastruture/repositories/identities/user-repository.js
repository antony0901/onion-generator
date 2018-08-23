const BaseRepository = require('../base-repository');
class UserRepository extends BaseRepository {
  constructor({
    User,
    Role
  }, transaction) {
    super(User, transaction);
    this.Role = Role;
  }

  getUserIncludeRole({
    email
  }) {
    return this.entity.findOne({
      where: {email: email},
      include: [this.Role]
    }).then((rs) => {
      if (!rs) {
        return null;
      }

      return rs.toModelIncludeRole();
    });
  }
}

module.exports = UserRepository;