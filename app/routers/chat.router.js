const { Router } = require('express');
const { getChatController } = require('../controllers/chat.controller');

const attachTo = (app, data) => {
    const chatRouter = new Router();
    const chatController = getChatController();

    chatRouter
        .get('/', chatController.getChatForm);

    app.use('/chat', chatRouter);
};

module.exports = { attachTo };
