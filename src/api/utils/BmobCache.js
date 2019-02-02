
const getValidKey = key => JSON.stringify(key);

class BmobCache {
  cache = {};

  hasCache(tableName, key) {
    return Reflect.has(this.cache, tableName)
      && Reflect.has(this.cache[tableName], getValidKey(key));
  }

  getCache(tableName, key) {
    return this.cache[tableName][getValidKey(key)];
  }

  setCache(tableName, key, value) {
    if (!Reflect.has(this.cache, tableName)) {
      this.createNewItem(tableName);
    }

    this.cache[tableName][getValidKey(key)] = value;
  }

  createNewItem(tableName) {
    this.cache[tableName] = {};
  }
}

export default BmobCache;
