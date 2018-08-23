module.exports.policies = {
  /**
   * COMMON
   */
  'common/*': ['logged-in'],
  'common/file/*': ['logged-in'],
  'common/file/get': true,
};
