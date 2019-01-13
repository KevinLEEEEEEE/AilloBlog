const Koa = require('koa');

const app = new Koa();
const serve = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');

const staticPath = path.resolve(__dirname, '../static');

app.use(cors());

app.use(serve(staticPath));

app.listen(80, () => {
  console.log('listening on http://localhost:80');
});
