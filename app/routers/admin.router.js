const { Router } = require('express');

const attachTo = (app, { admin: adminController }, user) => {
    const adminRouter = new Router();

    adminRouter
        .get('/', adminController.getAdminPanel)
        .post('/task', adminController.createTask);

    app.use('/admin', user.can('access admin page'), adminRouter);
};

module.exports = { attachTo };
