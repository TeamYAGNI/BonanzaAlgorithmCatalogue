const { Router } = require('express');

const attachTo = (app, { categories: categoriesController }, user) => {
    const categoriesRouter = new Router();

    categoriesRouter
        .get('/', categoriesController.getCategories)
        .post('/', user.can('access admin page'),
        categoriesController.addCategory)

        .put('/:categoryName', user.can('access admin page'),
        categoriesController.editCategory)
        .delete('/:categoryName', user.can('access admin page'),
        categoriesController.removeCategory)

        .get('/:categoryName/algorithms', categoriesController.getCategory)
        .post('/:categoryName/algorithms', user.can('access admin page'),
        categoriesController.addAlgorithm)

        .get('/:categoryName/algorithms/:algorithmName',
        categoriesController.getAlgorithm)
        .put('/:categoryName/algorithms/:algorithmName',
        user.can('access admin page'),
        categoriesController.editAlgorithm)
        .delete('/:categoryName/algorithms/:algorithmName',
        user.can('access admin page'),
        categoriesController.removeAlgorithm);

    app.use('/catalogue/categories', categoriesRouter);
};

module.exports = { attachTo };
