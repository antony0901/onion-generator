const bcrypt = require('bcrypt');
const uowFactory = require('../../infrastruture/uow');
const Constants = require('../../infrastruture/common/constants');
const Errors = require('../../infrastruture/common/errors');

module.exports = (dbContext, {
  email,
  password
}) => {
  const uow = uowFactory.create(dbContext);

  return uow.open(() => {
    return new Promise((resolve, reject) => {
      const userRepo = uow.getRepository({
        moduleName: Constants.Modules.Identities,
        repoName: Constants.Repos.User
      });

      userRepo.getUserIncludeRole({
        email: email
      }).then((rs) => {
        if (!rs) {
          throw new Error(Errors.WRONG_EMAIL);
        }

        return bcrypt.compare(password, rs.password).then((checked) => {
          return {
            checked: checked,
            user: rs
          };
        });
      }).then((rs) => {
        if (!rs.checked) {
          throw new Error(Errors.WRONG_PWD);
        } else {
          resolve(rs.user);
        }
      }).catch(err => {
        reject(new Error(err));
      });
    });
  });
};
