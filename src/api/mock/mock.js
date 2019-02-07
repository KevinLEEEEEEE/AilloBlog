import Mock from 'mockjs';
import mdMock from './mdMock';

const imageMock = (options) => {
  const size = options.url.match(/w\/([0-9]*)\/h\/([0-9]*)/i) || [0, '2000', '1225'];
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


function mockSwitch(key, value, originValue) {
  console.log(`Mock ${key}: ${value ? 'on' : 'off'}${value !== originValue ? ' [conflict]' : ''}`);

  if (!value) {
    return;
  }

  switch (key) {
    case 'Pages':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Homepage/i, homepageMock);
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Notes/i, notesEssaysMock);
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Photographs/i, photosDesignsMock);
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Designs/i, photosDesignsMock);
      break;
    case 'Contents':
      Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/PhotoContents/i, photoContentsMock);
      break;
    case 'Markdown':
      Mock.mock(/.md/i, mdMock);
      break;
    case 'Images':
      Mock.mock(/http:\/\/cdn.lucario.cn/, imageMock);
      break;
    default:
  }
}

export default function mock(config) {
  console.log('********** Mock Settings **********', '\n');

  const mockConfig = {
    Pages: config.Pages,
    Contents: config.Pages || config.Contents,
    Markdown: config.Pages || config.Contents || config.Markdown,
    Images: config.Pages || config.Contents || config.Images,
  };

  Object.keys(mockConfig).forEach((key) => {
    mockSwitch(key, mockConfig[key], config[key]);
  });

  console.log('***********************************', '\n');
}
