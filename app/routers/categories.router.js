const { Router } = require('express');

const attachTo = (app, { categories: categoriesController }, user) => {
    const categoriesRouter = new Router();

    categoriesRouter
        .get('/', categoriesController.getAll)
        .post('/', user.can('access admin page'), categoriesController
            .addCategory)
        .get('/:name', categoriesController.getCategory)
        .put('/:name', user.can('access admin page'), categoriesController
            .editCategory)
        .delete('/:name', user.can('access admin page'), categoriesController
            .removeCategory);

    app.use('/catalogue/categories', categoriesRouter);
};

module.exports = { attachTo };
