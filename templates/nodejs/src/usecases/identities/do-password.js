const bcrypt = require('bcrypt');
const Errors = require('../../infrastruture/common/errors');

module.exports = (dbContext, {
  email,
  password
}) => {
  return dbContext.User.findOne({
    where: {
      email: email
    },
    include: [{
      model: dbContext.Role
    }]
  }).then((user) => {
    if (!user) {
      throw Errors.NOT_FOUND;
    }

    return bcrypt.compare(password, user.password)
      .then((checked) => {
        return {
          checked: checked,
          user: user
        };
      });
  }).then((rs) => {
    if (!rs.checked) {
      throw Errors.WRONG_EMAIL;
    } else {
      return rs.user;
    }
  });
};