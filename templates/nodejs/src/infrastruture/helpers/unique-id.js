const uuid = require('uuid/v1');

class UniqueId {
  static generate() {
    return uuid();
  }
}

module.exports = UniqueId;