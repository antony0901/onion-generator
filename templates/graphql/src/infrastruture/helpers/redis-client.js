const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {
  ...client,
  get: (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        if(err){
          reject(err);
        }else{
          resolve(JSON.parse(reply));
        }
      });
    });
  },
  set: (key, value) => {
    return new Promise((resolve, reject) => {
      client.set(key, JSON.stringify(value), (err, reply) => {
        if(err){
          reject(err);
        }else{
          resolve(reply);
        }
      });
    });
  }
};
