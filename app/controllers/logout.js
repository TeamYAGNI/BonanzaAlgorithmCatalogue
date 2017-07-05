const { Router } = require('express');

const attach = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
        req.logout();
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            req.session = null;
            res.redirect('/api/');
        });
    });

    app.use('/api/logout', router);
};

module.exports = attach;
