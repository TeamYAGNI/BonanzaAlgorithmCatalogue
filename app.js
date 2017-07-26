const config = require('./config/config');

const async = () => {
    return Promise.resolve();
};

async()
    .then(() => require('./db').init(config.db))
    .then((db) => require('./data').init(db))
    .then((data) => require('./config/express').init(data, config))
    .then((app) => {
       const server = app.listen(config.port, () =>
            console.log(`Express server listening on port:${config.port}`));

        const io = require('socket.io')();
        io.attach(server);
        console.log('Socket listening on port ' + server.address().port);
        io.on('connection', (socket) => {
            socket.emit('message', { messageText: 'welcome to the chat' });
            socket.on('send', (data) => {
                io.sockets.emit('message', data);
            });
        });
    });
