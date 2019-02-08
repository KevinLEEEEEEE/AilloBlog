import axios from 'axios';
import BmobCache from './BmobCache';

const cache = new BmobCache();

class Bmob {
  id = '39547066d4ccdb3c861811b8deb5fb58';

  key = '52a732feb4cc614a6de161b2aba98e89';

  tableName;

  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * @returns {Number}
   */
  async getCount() {
    const data = await this.getQueryData({
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
    const data = await this.getQueryData({
      limit: itemsPerPage,
      skip: (pageNumber - 1) * itemsPerPage,
      order,
    });

    return data.results;
  }

  async queryItemByProperty(property, value) {
    const data = await this.getQueryData();

    return data.results.filter(item => item[property] === value);
  }

  async getQueryData(params = {}) {
    if (cache.hasCache(this.tableName, params)) {
      return Promise.resolve(cache.getCache(this.tableName, params));
    }

    return this.sendBmobRequest(params)
      .then((res) => {
        cache.setCache(this.tableName, params, res.data);

        return res.data;
      })
      .catch(() => {
        console.error('Bmob request failed');

        return {
          results: [],
          count: 0,
        };
      });
  }

  sendBmobRequest(params) {
    return axios.get(`https://api.bmobcloud.com/1/classes/${this.tableName}`, {
      headers: {
        'X-Bmob-Application-Id': this.id,
        'X-Bmob-REST-API-Key': this.key,
      },
      params,
    });
  }
}

export default Bmob;
