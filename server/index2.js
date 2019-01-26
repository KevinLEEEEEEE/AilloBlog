const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const enforceHttps = require('koa-sslify').default;
const compress = require('koa-compress');
const serve = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');


const app = new Koa();
const staticPath = path.resolve(__dirname, '../static');
const compressOptions = { threshold: 2048 };
const httpsOptions = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.pem'),
};

app.use(cors());

app.use(enforceHttps());

app.use(compress(compressOptions));

app.use(serve(staticPath));

http.createServer(app.callback()).listen(8080);
https.createServer(httpsOptions, app.callback()).listen(443);

console.log('https server is running');
