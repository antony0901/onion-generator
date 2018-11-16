const _ = require('lodash');

const assign = function (state, path, value) {
  const names = path.split('.');
  for (let i = 0, len = names.length; i < len; i++) {
    if (i === (len - 1)) {
      state = state[names[i]] = state[names[i]] || value;
    } else if (parseInt(names[i + 1]) >= 0) {
      state = state[names[i]] = state[names[i]] || [];
    } else {
      state = state[names[i]] = state[names[i]] || {};
    }
  }
};

/**
 * Returns an object which is converted from a key pair array that follows format: 'a.b.c.d.e'
 * @param {Array} arr a key pair array
 */
const convert = (arr) => {
  let myObj = {};
  _.forEach(arr, (item) => {
    assign(myObj, item.key, item.value);
  });

  return myObj;
};

module.exports.convert = convert;
