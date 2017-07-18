const { Router } = require('express');
const { getRegisterController } = require('../controllers/register');

const attachTo = (app, data) => {
    const registerRouter = new Router();
    const registerController = getRegisterController(data);

    registerRouter
        .get('/', (req, res) => registerController.getForm(req, res))
        .post('/', (req, res) => registerController.register(req, res));

    app.use('/register', registerRouter);
};

module.exports = { attachTo };
