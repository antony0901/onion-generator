// https://sailsjs.com/config/security

module.exports.security = {
  // https://sailsjs.com/docs/concepts/security/cors
  cors: {
    allRoutes: true,
    allowOrigins: '*',
    allowCredentials: true,
    allowAnyOriginWithCredentialsUnsafe: true,
    allowRequestHeaders: 'X-TENANT-ID, content-type, Authorization'
  },
  
  // https://sailsjs.com/docs/concepts/security/csrf
  // csrf: false
};
