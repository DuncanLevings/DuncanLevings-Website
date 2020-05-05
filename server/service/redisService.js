const redis = require("async-redis");

const GLOBAL_REDIS_CLIENT = process.env.PRODUCTION
    ? redis.createClient(***REMOVED*** host: "10.0.1.19" ***REMOVED***)
    : redis.createClient();

client.on('connect', function() ***REMOVED***
    console.log('Redis client connected');
***REMOVED***);

client.on('error', function (err) ***REMOVED***
    console.log('Something went wrong ' + err);
***REMOVED***);

module.exports = GLOBAL_REDIS_CLIENT;