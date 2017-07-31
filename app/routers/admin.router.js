const { Router } = require('express');

const attachTo = (app, { admin: adminController }, user) => {
    const adminRouter = new Router();

    adminRouter
        .get('/', user.can('access admin page'),
         adminController.getAdminPanel)
        .post('/', user.can('access admin page'),
         adminController.createTask)
        .get('/:id', user.can('access admin page'),
         adminController.getAdminPanel)
        .put('/:id', user.can('access admin page'),
         adminController.updateTask)
        .post('/:id', user.can('access admin page'),
         adminController.deleteTask);

    app.use('/admin', adminRouter);
};

module.exports = { attachTo };
