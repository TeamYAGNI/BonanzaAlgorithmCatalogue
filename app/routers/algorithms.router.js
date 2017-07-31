const { Router } = require('express');

const attachTo = (app, { algorithms: algoController }, user) => {
    const algoRouter = new Router();

    algoRouter
        .get('/', algoController.getAll)
        .get('/:name', algoController.getAlgorithm)
        .put('/:name', user.can('access admin page'), algoController
        .editAlgorithm)
        .post('/:name', user.can('access admin page'), algoController
        .addAlgorithm)
        .delete('/:name', user.can('access admin page'), algoController
        .removeAlgorithm);

    app.use('catalogue/algorithms', algoRouter);
};

module.exports = { attachTo };
