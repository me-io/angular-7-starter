import * as express from './../app';
import { promisify } from 'util';

const driver = 'mongoCache';

const getData = async (key, defaultValue = null) => {
  // let memoryCache = express.app.locals.memoryCache;
  const dCache = express.app.locals[driver];
  const cacheGetAsync = promisify(dCache.get); // (A)

  const data = await cacheGetAsync(key);
  if (!data) {
    return defaultValue;
  }
  return JSON.parse(data);
};

/**
 *
 * @param key
 * @param value
 * @param ttl
 * @param defaultValue
 * @returns {Promise<void>}
 */
const setData = async (key, value, ttl = 300, defaultValue = null) => {

  const objValue = JSON.stringify(value);
  // let memoryCache = express.app.locals.memoryCache;
  const dCache = express.app.locals[driver];
  return dCache.set(key, objValue, { ttl: ttl }, function (err) {
    if (err) {
      console.log(err);
      return defaultValue;
    }
    return value;
  });
};

const getSetData = async (key, value, ttl = 300, defaultValue = null, setter) => {
  return setter();
};


export { getData, setData, getSetData };
