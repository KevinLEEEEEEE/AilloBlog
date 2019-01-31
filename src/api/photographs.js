import Bmob from './utils/Bmob';

const PhotographsBmob = new Bmob('Photographs');

const getCount = async () => PhotographsBmob.getCount();

const getList = async () => PhotographsBmob.getList('-order');

const getListByPage = async (itemsPerPage, pageNumber) => PhotographsBmob.getListByPage(itemsPerPage, pageNumber, '-order');

const photographs = {
  getCount,
  getList,
  getListByPage,
};

export default photographs;
