const Koa = require('koa');
const compress = require('koa-compress');
const serve = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');

const PORT = 80;

const app = new Koa();
const compressOptions = { threshold: 2048 };
const staticPath = path.resolve(__dirname, '../static');

app.use(cors());

app.use(compress(compressOptions));

app.use(serve(staticPath));

app.listen(PORT, () => {
  console.log('listening on http://localhost:80');
});
