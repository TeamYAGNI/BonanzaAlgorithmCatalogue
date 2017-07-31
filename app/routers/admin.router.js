const { Router } = require('express');

const attachTo = (app, { admin: adminController }, user) => {
    const adminRouter = new Router();

    adminRouter
        .get('/', user.can('access admin page'), adminController.getAdminPanel)
        .post('/task', user.can('access admin page'), adminController
            .createTask);

    app.use('/admin', adminRouter);
};

module.exports = { attachTo };
