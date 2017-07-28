const { Router } = require('express');

const attachTo = (app, { admin: adminController }) => {
    const adminRouter = new Router();

    adminRouter
        .get('/', adminController.getAdminPanel)
        .post('/task', adminController.createTask);

    app.use('/admin', adminRouter);
};

module.exports = { attachTo };
