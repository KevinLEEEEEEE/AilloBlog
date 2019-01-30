import axios from 'axios';
import BmobCache from './BmobCache';

class Bmob {
  id = '39547066d4ccdb3c861811b8deb5fb58';

  key = '52a732feb4cc614a6de161b2aba98e89';

  tableName;

  cache;

  constructor(tableName) {
    this.tableName = tableName;

    this.cache = new BmobCache(tableName);
  }

  /**
   * @returns {Number}
   */
  async getCount() {
    const data = await this.sendBmobRequest({
      count: 1,
      limit: 0,
    });

    return data.count;
  }

  /**
   * @param {String} order
   */
  async getList(order) {
    return this.getListByPage(null, null, order);
  }

  /**
   * @param {Number} itemsPerPage
   * @param {Number} pageNumber
   * @param {String} order
   */
  async getListByPage(itemsPerPage = 100, pageNumber = 1, order = '') {
    const data = await this.sendBmobRequest({
      limit: itemsPerPage,
      skip: (pageNumber - 1) * itemsPerPage,
      order,
    });

    return data.results;
  }

  async sendBmobRequest(params = {}) {
    if (this.cache.hasCache(params)) {
      return Promise.resolve(this.cache.getCache(params));
    }

    const res = await axios.get(`https://api.bmobcloud.com/1/classes/${this.tableName}`, {
      headers: {
        'X-Bmob-Application-Id': this.id,
        'X-Bmob-REST-API-Key': this.key,
      },
      params,
    });

    this.cache.setCache(params, res.data);

    return res.data;
  }
}

export default Bmob;
