const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const Router = require('koa-router');
const respond = require('koa-respond');

const router = new Router();
const app = new Koa();

// MiddleWares

app.use(bodyParser());
app.use(cors({
  origin: 'http://localhost:8081',
}));
app.use(respond());

// Routes

router.get('/', (ctx, next) => {
  ctx.ok({ message: 'Welcome to bezkoder application.' });
});


app.use(router.routes())
  .use(router.allowedMethods());


// Listen

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
