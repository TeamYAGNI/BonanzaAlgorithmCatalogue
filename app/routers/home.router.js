const { Router } = require('express');

const attachTo = (app, data, { home: homeController }) => {
    const homeRouter = new Router();

    homeRouter
        .get('/', homeController.getHome);

    app.use('/', homeRouter);
};

module.exports = { attachTo };
