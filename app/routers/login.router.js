const { Router } = require('express');
const passport = require('passport');
const { getLoginController } = require('../controllers/login');

const attachTo = (app, data) => {
    const loginRouter = new Router();
    const loginController = getLoginController();

    loginRouter
        .get('/', (req, res) => loginController.getForm(req, res))
        .post('/', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }));

    app.use('/login', loginRouter);
};

module.exports = { attachTo };
