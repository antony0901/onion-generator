class ResponseAsMessage {
  constructor(err, message) {
    this.error = err;
    this.message = message;
  }
}

module.exports = ResponseAsMessage;
