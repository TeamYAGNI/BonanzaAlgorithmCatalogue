const { Router } = require('express');
const { getAuthController } = require('../controllers/auth.controller');

const attachTo = (app, data) => {
    const authRouter = new Router();
    const authController = getAuthController(data);

    authRouter
        .get('/login', authController.getLoginForm)
        .post('/login', authController.login)
        .get('/logout', authController.logout)
        .get('/register', authController.getRegisterForm)
        .post('/register', authController.register);

    app.use('/auth', authRouter);
};

module.exports = { attachTo };
