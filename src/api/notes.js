import BmobUtils from './Bmob';

const query = BmobUtils.generateQuery('Notes');

const getQuery = () => query;

const getCount = async () => BmobUtils.getQueryCount(query);

const getList = async () => BmobUtils.queryFind(query, 0, 0, '-order');

const getListByPage = async (itemsPerPage, pageNumber) => BmobUtils.queryFind(query, itemsPerPage, itemsPerPage * (pageNumber - 1), '-order');

const notes = {
  getQuery,
  getCount,
  getList,
  getListByPage,
};

export default notes;
