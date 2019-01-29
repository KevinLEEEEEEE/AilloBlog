import Bmob from 'hydrogen-js-sdk';

const BmobUtils = {
  id: '',
  key: '',

  /**
   * @param {String} id
   * @param {String} key
   */
  initialize(id, key) {
    Bmob.initialize(id, key);

    this.id = id;
    this.key = key;
  },

  /**
   * @param {BmobQuery} query
   */
  getQueryCount(query) {
    return query.count();
  },

  /**
   * @param {String} tableName
   */
  generateQuery(tableName) {
    return Bmob.Query(tableName);
  },

  /**
   * basic query.find()
   * @param {BmobQuery} query
   * @param {Number} limit
   * @param {Number} skip
   * @param {String} order
   * @returns {Array}
   */
  queryFind(query, limit, skip, order) {
    if (limit) {
      query.limit(limit);
    }

    if (skip) {
      query.skip(skip);
    }

    if (order) {
      query.order(order);
    }

    return query.find();
  },
};

export default BmobUtils;
