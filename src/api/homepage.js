import BmobUtils from './Bmob';

const query = BmobUtils.generateQuery('Homepage');

const getQuery = () => query;

const getCount = async () => BmobUtils.getQueryCount(query);

const getList = () => BmobUtils.queryFind(query, 0, 0, 'order');

const homepage = {
  getQuery,
  getCount,
  getList,
};


export default homepage;
