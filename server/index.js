const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((request, response) => {
  const pathObj = url.parse(request.url, true);
  const staticPath = path.resolve(__dirname, '../static');
  const filePath = path.join(staticPath, pathObj.pathname);

  fs.readFile(filePath, 'binary', (err, fileContent) => {
    if (err) {
      console.log('404');
      response.writeHead(404, 'not found');
      response.end('<h1>404 Not Found</h1>');
    } else {
      console.log('ok');
      response.setHeader('content-type', 'text/plain');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.write(fileContent, 'binary');
      response.end();
    }
  });
});

server.listen(3001);

console.log('listening on http://localhost:3001');
