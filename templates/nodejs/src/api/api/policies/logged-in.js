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
        return proceed();
      }
    });
};