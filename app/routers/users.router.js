const { Router } = require('express');

const attachTo = (app, { users: userController }, admin) => {
    const usersRouter = new Router();

    usersRouter
        .get('/', isLoggedIn, userController.getUsers)
        .get('/:username', isLoggedIn, userController.getProfile)
        .get('/:username/settings', isLoggedIn, userController.getEditForm)
        .put('/:username/settings', isLoggedIn, userController.editProfile);

    app.use('/users', usersRouter);
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
         res.redirect('/auth/login');
    }
        return next();
};

module.exports = { attachTo };
