const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((request, response) => {
  // 获取输入的url解析后的对象
  const pathObj = url.parse(request.url, true);
  // static文件夹的绝对路径
  const staticPath = path.resolve(__dirname, '../static');
  // 获取资源文件绝对路径
  const filePath = path.join(staticPath, pathObj.pathname);
  // 异步读取file
  fs.readFile(filePath, 'binary', (err, fileContent) => {
    console.log(filePath);
    if (err) {
      console.log('404');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.writeHead(404, 'not found');
      response.end('<h1>404 Not Found</h1>');
    } else {
      console.log('ok');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.write(fileContent, 'binary');
      response.end();
    }
  });
});
server.listen(3001);
console.log('visit http://localhost:3001');
