const { Router } = require('express');
const { getAdminController } = require('../controllers/admin.controller');

const attachTo = (app, data) => {
    const adminRouter = new Router();
    const adminController = getAdminController(data);

    adminRouter
        .get('/', adminController.getAdminPanel)
        .post('/task', adminController.createTask);

    app.use('/admin', adminRouter);
};

module.exports = { attachTo };
