const { Router } = require('express');

const attachTo = (app, { tasks: tasksController }) => {
    const tasksRouter = new Router();

    tasksRouter
        .get('/', isLoggedIn, tasksController.getTasksList)
        .get('/:id', isLoggedIn, tasksController.getCompilerForm)
        .post('/:id', isLoggedIn, tasksController.postTaskSolution)
        .get('/:id/:username', isLoggedIn, tasksController.getUserSubmissions);

    app.use('/tasks', tasksRouter);
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/login');
    }
    return next();
};

module.exports = { attachTo };
