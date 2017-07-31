const { Router } = require('express');

const attachTo = (app, { admin: adminController }) => {
    const adminRouter = new Router();

    adminRouter
        .get('/', adminController.getAdminPanel)
        .post('/', adminController.createTask)
        .get('/:id', adminController.getAdminPanel)
        .put('/:id', adminController.updateTask)
        .post('/:id', adminController.deleteTask);

    app.use('/admin', adminRouter);
};

module.exports = { attachTo };
