// https://sailsjs.com/config/http
module.exports.http = {
  middleware: {
    passportInit: require('passport').initialize(),
    passportSession: require('passport').session(),
    bodyParser: (function _configureBodyParser(){
      var skipper = require('skipper');
      var middlewareFn = skipper({
        strict: true,
      });
      return middlewareFn;
    })(),
    order: [
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ]
  },
};
