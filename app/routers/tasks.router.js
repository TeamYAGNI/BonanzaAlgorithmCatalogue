const { Router } = require('express');
const { getTasksController } = require('../controllers/tasks.controller');

const attachTo = (app, data) => {
    const tasksRouter = new Router();
    const tasksController = getTasksController(data);

    tasksRouter
        .get('/', tasksController.getTasksList)
        .get('/:id', tasksController.getCompilerForm)
        .post('/:id', tasksController.postTaskSolution);

    app.use('/tasks', tasksRouter);
};

module.exports = { attachTo };
