const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

const server = http.createServer((request, response) => {
  const pathObj = url.parse(request.url, true);
  const staticPath = path.resolve(__dirname, '../static');
  const filePath = path.join(staticPath, pathObj.pathname);
  const mimeType = mime.getType(filePath);

  console.log(filePath);

  fs.readFile(filePath, 'binary', (err, fileContent) => {
    if (err) {
      console.log('404');
      response.writeHead(404, 'not found');
      response.end('<h1>404 Not Found</h1>');
    } else {
      console.log('ok');
      response.setHeader('content-type', mimeType);
      response.setHeader('Access-Control-Allow-Origin', '*');
      // response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
      // response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      response.write(fileContent, 'binary');
      response.end();
    }
  });
});

server.listen(80);

console.log('listening on http://localhost:80');
