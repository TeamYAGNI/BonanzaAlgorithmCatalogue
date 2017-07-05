const { Router } = require('express');
const passport = require('passport');

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return res.render('login');
        })
        .post('/',
        passport.authenticate('local', {
            successRedirect: '/api',
            failureRedirect: '/api/login',
            failureFlash: true,
        })
        );

    app.use('/api/login', router);
};

module.exports = attach;
