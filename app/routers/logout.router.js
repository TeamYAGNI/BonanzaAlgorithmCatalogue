const { Router } = require('express');
const { getLogoutController } = require('../controllers/logout');

const attachTo = (app, data) => {
    const logoutRouter = new Router();
    const logoutController = getLogoutController();

    logoutRouter.get('/', (req, res) => logoutController.logout(req, res));
    app.use('/logout', logoutRouter);
};

module.exports = { attachTo };
