import Bmob from './utils/Bmob';

const HomepageBmob = new Bmob('Homepage');

const getCount = async () => HomepageBmob.getCount();

const getList = async () => HomepageBmob.getList('order');

const homepage = {
  getCount,
  getList,
};

export default homepage;
