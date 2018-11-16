const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook-token');

const verifyHandler = (req, accessToken, refreshToken, profile, done) => {
  const newUserPayload = {
    name: profile.displayName,
    email: _.head(profile.emails).value,
    loginKey: profile.id,
    loginProvider: profile.provider,
    avatar: _.head(profile.photos).value,
  };

  done(null, newUserPayload);
};

const fileName = path.resolve(__dirname, 'fb.json');

fs.readFile(fileName, 'utf8', (err, rs) => {
  if (err) {
    throw new Error(err);
  }
  const data = JSON.parse(rs);
  _.forEach(data.config, (item) => {

    passport.use(item.tenantId, new FacebookStrategy({
      clientID: item.clientID,
      clientSecret: item.clientSecret,
      passReqToCallback: true
    }, verifyHandler));
  });
});


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, user);
});
