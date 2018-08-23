const request = require('request');

class HttpClient {
  constructor(_headers = null) {
    this.headers = this.headers ? {
      'Content-Type': 'application/json'
    } : _headers;
    this.params = null;
  }

  post(url, requestBody) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST',
        url: url,
        form: requestBody,
        headers: this.headers
      };

      request(requestOptions, (error, response, body) => {
        if (error) {
          throw new Error(error);
        }

        resolve(JSON.parse(body));
      });
    });
  }

  get(url) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        url: url,
        headers: this.headers
      };

      //only Myinfo API
      if (this.params) {
        _.set(options, "qs", this.params);
      }

      request(options, (error, response, body) => {
        if (error) {
          throw new Error(error);
        }

        resolve(JSON.parse(body));
      });
    });
  }

  changeHeader(newHeader) {
    this.headers = newHeader;
  }

  changeParams(params) {
    this.params = params;
  }
}

module.exports = HttpClient;
