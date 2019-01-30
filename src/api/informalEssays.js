import Bmob from './utils/Bmob';

const NotesBmob = new Bmob('InformalEssays');

const getCount = async () => NotesBmob.getCount();

const getList = async () => NotesBmob.getList('-order');

const getListByPage = async (itemsPerPage, pageNumber) => NotesBmob.getListByPage(itemsPerPage, pageNumber, '-order');

const InformalEssays = {
  getCount,
  getList,
  getListByPage,
};

export default InformalEssays;
