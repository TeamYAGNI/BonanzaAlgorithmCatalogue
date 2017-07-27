const { Router } = require('express');

const attachTo = (app, { home: homeController }) => {
    const homeRouter = new Router();

    homeRouter
        .get('/', homeController.getHome)
        .get('/about', () => {});
    app.use('/', homeRouter);
};

module.exports = { attachTo };
