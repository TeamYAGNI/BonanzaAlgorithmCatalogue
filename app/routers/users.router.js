const { Router } = require('express');
const { getUserController } = require('../controllers/users');

const attachTo = (app, data) => {
    const usersRouter = new Router();
    const userController = getUserController(data);

    usersRouter
        .get('/', (req, res) => {
            userController.getUsers(req, res);
        })
        .get('/:id', (req, res) => userController.getById(req, res));

    app.use('/users', usersRouter);
};

module.exports = { attachTo };
