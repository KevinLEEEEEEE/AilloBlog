import Bmob from './utils/Bmob';

const NotesBmob = new Bmob('Notes');

const getCount = async () => NotesBmob.getCount();

const getList = async () => NotesBmob.getList('-order');

const getListByPage = async (itemsPerPage, pageNumber) => NotesBmob.getListByPage(itemsPerPage, pageNumber, '-order');

const notes = {
  getCount,
  getList,
  getListByPage,
};

export default notes;
