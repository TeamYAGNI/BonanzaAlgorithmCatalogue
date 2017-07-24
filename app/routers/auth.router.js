const { Router } = require('express');

const attachTo = (app, data, { auth: authController }) => {
    const authRouter = new Router();

    authRouter
        .get('/login', authController.getLoginForm)
        .post('/login', authController.login)
        .get('/logout', authController.logout)
        .get('/register', authController.getRegisterForm)
        .post('/register', authController.register)
        .get('/facebook', authController.facebookLogin)
        .get('/facebook/callback', authController.facebookLoginCallback)
        .get('/google', authController.googleLogin)
        .get('/google/callback', authController.googleLoginCallback);

    app.use('/auth', authRouter);
};

module.exports = { attachTo };
