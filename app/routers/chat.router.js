const { Router } = require('express');

const attachTo = (app, { chat: chatController }) => {
    const chatRouter = new Router();

    chatRouter
        .get('/', chatController.getChatForm);

    app.use('/chat', chatRouter);
};

module.exports = { attachTo };
