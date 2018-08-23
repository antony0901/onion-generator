const moment = require('moment');

const getFirstDayOfYear = function () {
  return moment().startOf('year');
};

const getThisDateLastYears = function (years) {
  return moment().subtract(years, 'years');
};

module.exports = {
  getFirstDayOfYear,
  getThisDateLastYears
};
