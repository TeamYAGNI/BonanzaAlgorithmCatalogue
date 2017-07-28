const { Router } = require('express');
const { getCompilerController } = require('../controllers/compiler.controller');

const attachTo = (app, data) => {
    const compilerRouter = new Router();
    const compilerController = getCompilerController(data);

    compilerRouter
        .get('/', compilerController.getTasksList)
        .get('/:id', compilerController.getCompilerForm)
        .post('/:id', compilerController.postTaskSolution);

    app.use('/compiler', compilerRouter);
};

module.exports = { attachTo };
