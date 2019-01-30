import Mock from 'mockjs';
import mockMd from './mockMd';

const qiniuSizeRegExp = /w\/([0-9]*)\/h\/([0-9]*)/i;

Mock.mock(/http:\/\/cdn.lucario.cn/, (options) => {
  const size = options.url.match(qiniuSizeRegExp);
  const width = parseInt(size[1], 10);
  const height = parseInt(size[2], 10);

  return Mock.Random.dataImage(`${width}x${height}`);
});

Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/Homepage/i, {
  count: 3,
  'results|3': [{
    'objectId|+1': 1,
    title: Mock.Random.cword(4),
    folder: 'folder',
    filename: 'filename',
    covername: 'cover',
    routename: 'read',
  }],
});

Mock.mock(/https:\/\/api.bmobcloud.com\/1\/classes\/[Notes|InformalEssays]/i, {
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
});

Mock.mock(/.md/i, mockMd);
