const Router = require('koa-router');
const sqlite = require('sqlite');
const { join } = require('path');
const { SQL } = require('sql-template-strings');
const jwt = require('jsonwebtoken');
const { hashSync } = require('bcrypt');
const router = new Router({
    prefix: '/api/v1'
});

const dbPromise = sqlite.open(join(__dirname, '../../database', 'database.sqlite'), {
    Promise
});

class IndexRouter {

    static async set(ctx) {
        ctx.assert(ctx.request.body, 400, 'key and value are required');
        ctx.assert(ctx.request.body.key, 400, 'key is required');
        ctx.assert(ctx.request.body.value, 400, 'value is required');
        
        const body = ctx.request.body;
        const db = await dbPromise;
        await db.run('CREATE TABLE IF NOT EXISTS map (key TEXT, value TEXT)');
        await db.run(SQL `INSERT INTO map VALUES (${body.key}, ${body.value})`);

        ctx.body = '';
    }

    static async get(ctx) {

        const db = await dbPromise;
        const key = ctx.params.key;
        const row = await db.get(SQL `SELECT value from map where key=${key}`);
        if (!row || !row.value) {
            ctx.throw(404, 'Key not found');
            return;
        }
        ctx.body = row;
    }

    static async jwt(ctx) {
        const token = jwt.sign(ctx.request.body, process.env.PASSWORD, { expiresIn: '24h' });

        ctx.body = {
            token
        };
    }

    static async hash(ctx) {
        const hash =  hashSync(ctx.params.text, 14);
        ctx.body = {
            hash
        };
    }


    static async health(ctx) {        
        ctx.body = 'ok';
    }

}

router.post('/sqlite/set', IndexRouter.set);
router.get('/sqlite/get/:key', IndexRouter.get);

router.post('/jwt', IndexRouter.jwt);
router.get('/hash/:text', IndexRouter.hash);

router.get('/health', IndexRouter.health);
module.exports = router;