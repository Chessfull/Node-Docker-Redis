const redis = require('redis');
require('dotenv').config(); // -> For using env

// ▼ Create a Redis client ▼
const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // Docker service name for Redis, from env
});

// ▼ Adding eventlistnere 'connect' and 'error' to Redis ▼
redisClient.on('connect', () => {
  console.log('Connected to Redis succsfull');
});
redisClient.on('error', (err) => {
  console.error('Redis error along connection:', err);
});

// ▼ Connect the client ▼
// redisClient.connect(); // -> This is returning promise so make it more modular and error handling ▼

(async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();


module.exports = redisClient;
