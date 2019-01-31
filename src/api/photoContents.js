import Bmob from './utils/Bmob';

const PhotoContentsBmob = new Bmob('PhotoContents');

const queryItemByProperty = name => PhotoContentsBmob.queryItemByProperty('filename', name);

const photoContents = {
  queryItemByProperty,
};

export default photoContents;
