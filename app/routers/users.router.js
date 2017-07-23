const { Router } = require('express');
const { getUserController } = require('../controllers/users.controller');

const attachTo = (app, data) => {
    const usersRouter = new Router();
    const userController = getUserController(data);

    usersRouter
        .get('/', userController.getUsers)
        .get('/:id', userController.getById);

    app.use('/users', usersRouter);
};

module.exports = { attachTo };
