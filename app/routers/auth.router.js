const { Router } = require('express');
const { getAuthController } = require('../controllers/auth.controller');

const attachTo = (app, data) => {
    const authRouter = new Router();
    const authController = getAuthController(data);

    authRouter
        .get('/login', (req, res) => authController.getLoginForm(req, res))
        .post('/login', (req, res, next) => {
            authController.login(req, res, next);
        })

        .get('/logout', (req, res) => authController.logout(req, res))

        .get('/register', (req, res) => {
            authController.getRegisterForm(req, res);
        })
        .post('/register', (req, res) => authController.register(req, res));

    app.use('/auth', authRouter);
};

module.exports = { attachTo };
