const { Router } = require('express');

const attachTo = (app, { categories: categoriesController }, user) => {
    const categoriesRouter = new Router();

    categoriesRouter
        .get('/', categoriesController.getCategories)
        .post('/', user.can('access admin page'),
        categoriesController.addCategory)
        .delete('/:categoryName', user.can('access admin page'),
        categoriesController.removeCategory)
        .get('/:categoryName', categoriesController.getCategory)
        .post('/:categoryName', user.can('access admin page'),
        categoriesController.addAlgorithm);

    app.use('/catalogue/categories', categoriesRouter);
};

module.exports = { attachTo };
