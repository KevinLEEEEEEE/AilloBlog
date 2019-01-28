import BmobUtils from './Bmob';

const query = BmobUtils.generateQuery('InformalEssays');

const getQuery = () => query;

const getCount = async () => BmobUtils.getQueryCount(query);

const getList = async () => BmobUtils.queryFind(query, 0, 0, '-order');

const getListByPage = async (itemsPerPage, pageNumber) => BmobUtils.queryFind(query, itemsPerPage, itemsPerPage * (pageNumber - 1), '-order');

const InformalEssays = {
  getQuery,
  getCount,
  getList,
  getListByPage,
};

export default InformalEssays;
