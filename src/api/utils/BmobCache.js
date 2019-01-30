
const cache = [];

const getValidKey = key => JSON.stringify(key);

class BmobCache {
  tableName;

  constructor(tableName) {
    this.tableName = tableName;
  }

  hasCache(key) {
    return Reflect.has(cache, this.tableName)
    && Reflect.has(cache[this.tableName], getValidKey(key));
  }

  getCache(key) {
    return cache[this.tableName][getValidKey(key)];
  }

  setCache(key, value) {
    if (!Reflect.has(cache, this.tableName)) {
      cache[this.tableName] = {};
    }

    cache[this.tableName][getValidKey(key)] = value;
  }
}

export default BmobCache;
