/* global $, io, sendMessage */
window.onload = function() {
    'use strict';

    const messages = [];
    const socket = io.connect('localhost:3000');
    const field = document.getElementById('field');
    const sendButton = document.getElementById('send');
    const content = document.getElementById('content');
    const name = document.getElementById('name');

    socket.on('message', (data) => {
        if (data.messageText) {
            messages.push(data);
            let html = '';
            messages.forEach((message) => {
                html += '<strong>' +
                    (message.username ? message.username : 'Server') +
                    ': </strong>';
                html += message.messageText + '<br />';
            });
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log('There is a problem:', data);
        }
    });

    sendButton.onclick = () => {
        const text = field.value;
        socket.emit('send', { messageText: text, username: name.value });
        field.value = '';
    };
};

$(document).ready(function() {
    $('#field').keyup(function(e) {
        if (e.keyCode === 13) {
            sendMessage();
        }
    });
});
