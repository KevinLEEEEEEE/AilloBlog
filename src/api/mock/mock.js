import Mock from 'mockjs';
import mdMock from './mdMock';

const imageMock = (options) => {
  const size = options.url.match(/w\/([0-9]*)\/h\/([0-9]*)/i);
  const width = parseInt(size[1], 10);
  const height = parseInt(size[2], 10);

  return Mock.Random.dataImage(`${width}x${height}`);
};

const homepageMock = {
  count: 3,
  'results|3': [{
    'objectId|+1': 1,
    title: Mock.Random.cword(4),
    folder: 'folder',
    filename: 'filename',
    covername: 'cover',
    routename: 'read',
  }],
};

const notesEssaysMock = {
  'count|1-50': 0,
  'results|8-12': [{
    'objectId|+1': 1,
    title: Mock.Random.cword(2, 6),
    description: Mock.Random.cword(5, 15),
    route: 'route',
    folder: 'folder',
    filename: 'filename',
    covername: 'cover',
    date: 'Jan 12, 2020',
    routename: 'read',
  }],
};

const photosDesignsMock = {
  'count|1-50': 0,
  'results|8-12': [{
    'objectId|+1': 1,
    title: Mock.Random.cword(2, 6),
    route: 'route',
    folder: 'folder',
    filename: 'filename',
    covername: 'cover',
    date: 'Jan 12, 2020',
    routename: 'view',
  }],
};

const photoContentsMock = {
  results: [{
    'objectId|+1': 1,
    filename: 'filename',
    'contents|1-10': [{
      'filename|+1': 1,
      description: 'description',
      width: Mock.Random.integer(500, 2000),
      height: Mock.Random.integer(500, 2000),
    }],
  }],
};


function mockSwitch(key, value) {
  if (!value) {
    return;
  }

  console.log(`mock: ${key}`);

  switch (key) {
    case 'Homepage':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Homepage/i, homepageMock);
      break;
    case 'Notes':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Notes/i, notesEssaysMock);
      break;
    case 'InformalEssays':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/InformalEssays/i, notesEssaysMock);
      break;
    case 'Photographs':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Photographs/i, photosDesignsMock);
      break;
    case 'Designs':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Designs/i, photosDesignsMock);
      break;
    case 'PhotoContents':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/PhotoContents/i, photoContentsMock);
      break;
    case 'Markdown':
      Mock.mock(/.md/i, mdMock);
      break;
    case 'Image':
      Mock.mock(/http:\/\/cdn.lucario.cn/, imageMock);
      break;
    default:
  }
}

export default function mock(config) {
  Object.keys(config).forEach((key) => {
    mockSwitch(key, config[key]);
  });
}
