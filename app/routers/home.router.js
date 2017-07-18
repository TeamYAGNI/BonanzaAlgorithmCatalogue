const { Router } = require('express');
const { getHomeController } = require('../controllers/home');

const attachTo = (app, data) => {
    const homeRouter = new Router();
    const homeController = getHomeController();

    homeRouter
        .get('/', (req, res) => homeController.getHome(req, res));

    app.use('/', homeRouter);
};

module.exports = { attachTo };
