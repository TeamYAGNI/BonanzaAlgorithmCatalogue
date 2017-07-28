const { Router } = require('express');

const attachTo = (app, { compiler: tasksController }) => {
    const tasksRouter = new Router();

    tasksRouter
        .get('/', tasksController.getTasksList)
        .get('/:id', tasksController.getCompilerForm)
        .post('/:id', tasksController.postTaskSolution);

    app.use('/tasks', tasksRouter);
};

module.exports = { attachTo };
