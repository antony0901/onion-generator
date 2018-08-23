const _ = require('lodash');
const Constants = require('../../../infrastruture/common/constants');

module.exports = async function (req, res, proceed) {
  await sails.helpers.verifyToken(req)
    .switch({
      error: function (err) {
        return res.serverError(err);
      },
      invalid: function (err) {
        return res.sendStatus(401);
      },
      success: function () {
        const roleParts = req.tokenPayload.roles.split(',');
        const isCustomerExisited = _.filter(roleParts, (role) => {
          return role === Constants.Role.Customer;
        }).length > 0;
        if(isCustomerExisited){
          return proceed();
        }

        return res.status(401).send('Access denied - only customer can access');
      }
    });
};