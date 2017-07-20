const { Router } = require('express');
const { getHomeController } = require('../controllers/home.controller');

const attachTo = (app, data) => {
    const homeRouter = new Router();
    const homeController = getHomeController();

    homeRouter
        .get('/', homeController.getHome);

    app.use('/', homeRouter);
};

module.exports = { attachTo };
