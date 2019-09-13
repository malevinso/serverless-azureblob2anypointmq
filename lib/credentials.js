const redis = require('async-redis');
const anypointmq = require('./anypointmq');
const config = require('./config.js');

const redisClient = redis.createClient( config.REDIS_PORT, 
                                        config.REDIS_HOST, 
                                        { auth_pass: config.REDIS_PASSWORD,
                                          tls: { servername: config.REDIS_HOST}
                                        });

redisClient.on("error", (err) => {
  throw(err);
});

const getCredentials = async () => {
  try {
    let credentials = await redisClient.get("credentials");
    if(!credentials) {
      credentials = await anypointmq.authenticate(config.ANYPOINTMQ_CLIENTID,
                                                config.ANYPOINTMQ_CLIENTSECRET,
                                                config.ANYPOINTMQ_GRANTTYPE);
      credentials = JSON.stringify(credentials);
      await redisClient.set("credentials", credentials, "EX", "600");
    }
    return credentials;
  } catch(err) {
    throw(err);
  }
}

exports.getCredentials = getCredentials;