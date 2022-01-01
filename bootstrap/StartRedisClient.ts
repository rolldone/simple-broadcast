
// const redisClient = require('redis-clients')
import RedisConfig from "@root/config/RedisConfig";
import Redis from 'redis';

export default function(next : Function){
  let redisConnect = Redis.createClient({
    port: RedisConfig.port,
    host: RedisConfig.host,
    auth_pass: RedisConfig.auth,
    no_ready_check: true,
    db : 0,
    prefix:'imgc_',
    // detect_buffers: true,
    // return_buffers: true
  });
  redisConnect.on('connect', () => {
    // this will throw all errors nohm encounters - not recommended
    global.redis = redisConnect;
    // example code goes here!
  })
  next(null);
};