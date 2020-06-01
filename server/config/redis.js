// const redis = require('async-redis');

// const GLOBAL_REDIS_CLIENT = process.env.PRODUCTION
//     ? redis.createClient({ host: '10.8.0.0' })
//     : redis.createClient();

// GLOBAL_REDIS_CLIENT.on('connect', function() {
//     console.log('Redis client connected');
// });

// GLOBAL_REDIS_CLIENT.on('error', function (err) {
//     console.log('Something went wrong ' + err);
// });

// module.exports = GLOBAL_REDIS_CLIENT;