const { Router } = require('express');

const attachTo = (app, { chat: chatController }) => {
    const chatRouter = new Router();

    chatRouter
        .get('/', isLoggedIn, chatController.getChatForm);

    app.use('/chat', chatRouter);
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/login');
    }
    return next();
};

module.exports = { attachTo };
