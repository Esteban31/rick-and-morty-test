import { createClient } from 'redis';

const host = process.env.REDIS_HOST || 'redis';
const port = process.env.REDIS_PORT || 6379;

const redisClient = createClient({
  url: `redis://${host}:${port}`
});

redisClient.on('connect', () => console.log(`🧠 Redis connected at :${port}`));
redisClient.on('error', err => console.error('Redis error:', err));

await redisClient.connect();

export default redisClient;
