const uuid = require('uuid/v4')
class UniqueId {
  static generate() {
    return uuid();
  }
}

module.exports = UniqueId;