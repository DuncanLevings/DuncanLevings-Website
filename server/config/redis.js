// const redis = require("async-redis");

// const GLOBAL_REDIS_CLIENT = process.env.PRODUCTION
//     ? redis.createClient(***REMOVED*** host: "10.8.0.0" ***REMOVED***)
//     : redis.createClient();

// GLOBAL_REDIS_CLIENT.on('connect', function() ***REMOVED***
//     console.log('Redis client connected');
// ***REMOVED***);

// GLOBAL_REDIS_CLIENT.on('error', function (err) ***REMOVED***
//     console.log('Something went wrong ' + err);
// ***REMOVED***);

// module.exports = GLOBAL_REDIS_CLIENT;