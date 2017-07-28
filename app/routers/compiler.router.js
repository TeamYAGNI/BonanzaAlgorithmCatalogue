const { Router } = require('express');

const attachTo = (app, { compiler: compilerController }) => {
    const compilerRouter = new Router();

    compilerRouter
        .get('/', compilerController.getTasksList)
        .get('/:id', compilerController.getCompilerForm)
        .post('/:id', compilerController.postTaskSolution);

    app.use('/compiler', compilerRouter);
};

module.exports = { attachTo };
