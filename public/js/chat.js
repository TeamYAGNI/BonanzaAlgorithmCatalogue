/* global $, io */
$(() => {
    const socket = io.connect('localhost:3000');
    const field = document.getElementById('field');
    const $sendButton = $('.send_message');
    const username = $('#current-username').html().trim();
    const content = document.getElementById('content');

    socket.on('message', (data) => {
        data.username = data.username ? data.username : 'Server';

        if (data.messageText) {
            const $message = $($('.message_template').clone().html());
            $message.find('.text')
                .html(data.username + ': ' + data.messageText);

            if (data.username === username) {
                $message.addClass('left');
            } else {
                $message.addClass('right');
            }

            $('.messages').append($message);
            $message.addClass('appeared');

            content.scrollTop = content.scrollHeight;
        } else {
            console.log('There is a problem:', data);
        }
    });

    const sendMessage = () => {
        const text = field.value;
        socket.emit('send', { messageText: text, username: username });
        field.value = '';
    };

    $sendButton.click(() => {
        sendMessage();
    });

    $('.message_input').keyup((e) => {
        if (e.keyCode === 13) {
            sendMessage();
        }
    });
});
