const io = require('socket.io')();

const init = (server) => {
    io.attach(server);
    console.log('Socket listening on port ' + server.address().port);
    io.on('connection', (socket) => {
        socket.emit('message', { messageText: 'Welcome to the chat' });
        socket.on('send', (data) => {
            io.sockets.emit('message', data);
        });
    });
};

module.exports = { init };
