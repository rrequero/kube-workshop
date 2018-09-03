const Koa = require('koa');
const body = require('koa-body');


const app = new Koa();
app.use(body());

const indexRouter = require('./routes/index.router');
app.use(indexRouter.middleware());

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error('Error running server', err);
        process.exit(1);
    }
    console.log(`Server listening in port: ${process.env.PORT}`);
});