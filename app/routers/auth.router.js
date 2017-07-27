const { Router } = require('express');

const attachTo = (app, { auth: authController }) => {
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
        .get('/google/callback', authController.googleLoginCallback)
        .get('/twitter', authController.twitterLogin)
        .get('/twitter/callback', authController.twitterLoginCallback);

    app.use('/auth', authRouter);
};

module.exports = { attachTo };
