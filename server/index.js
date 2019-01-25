const Koa = require('koa');
const compress = require('koa-compress');

const app = new Koa();
const serve = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');

const PORT = 80;
const staticPath = path.resolve(__dirname, '../static');

app.use(cors());

const options = { threshold: 2048 };
app.use(compress(options));

app.use(serve(staticPath));

app.listen(PORT, () => {
  console.log('listening on http://localhost:80');
});
