const { Router } = require('express');

const attachTo = (app, { users: userController }) => {
    const usersRouter = new Router();

    usersRouter
        .get('/', isLoggedIn, userController.getUsers)
        .get('/:id', isLoggedIn, userController.getById);

    app.use('/users', usersRouter);
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
         res.redirect('/auth/login');
    }
        return next();
};

module.exports = { attachTo };
