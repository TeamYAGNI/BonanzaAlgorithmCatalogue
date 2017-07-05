const { Router } = require('express');

const users = [{
    'name': 'Test',
    'id': 1,
}, {
    'name': 'Test2',
    'id': 2,
}, {
    'name': 'Test3',
    'id': 3,
}, {
    'name': 'Test4',
    'id': 4,
}, {
    'name': 'Test5',
    'id': 5,
}, {
    'name': 'Test6',
    'id': 6,
}, {
    'name': 'Test7',
    'id': 7,
}, {
    'name': 'Test8',
    'id': 8,
}, {
    'name': 'Test9',
    'id': 9,
}, {
    'name': 'Test10',
    'id': 10,
}, {
    'name': 'Test11',
    'id': 11,
}];

const attach = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
        let { q, page, size } = req.query;
        page = +page || 1;
        size = +size || 10;

        let result = users;
        if (q) {
            q = q.toLowerCase();

            result = result.filter((i) => {
                return i.name.toLowerCase().includes(q);
            });
        }
        if (result.length > (page - 1) * size) {
            result = result.slice((page - 1) * size, page * size);
        } else {
            result = result.slice(result.length - result.length % size);
        }
        res.send(result);
    })
        .get('/:id', (req, res, next) => {
            const id = +req.params.id;
            const user = users.find((u) => u.id === id);

            if (!user) {
                const err = new Error('Not Found');
                err.status = 404;
                next(err);
            }

            return res.status(200).send(user);
        })
        .post('/', (req, res) => {
            const body = req.body;
            body.id = ++users.length;
            users.push(body);
            res.status(201).send(body);
        });

    app.use('/api/users', router);
};

module.exports = attach;
