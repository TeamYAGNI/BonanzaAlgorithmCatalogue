/* global $, io */
$(() => {
    const socket = io.connect('http://ec2-35-158-219-114.eu-central-1.compute.amazonaws.com:3000');
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

    $('#photo-container').prepend(
        $.cloudinary.image('default-profile-picture', {
            radius: 'max',
            height: 150,
            width: 150,
            crop: 'scale',
        })
        .addClass("avatar img-circle img-thumbnail")
        .attr('id', 'profile-photo')
    );

    $('#photo-selector').unsigned_cloudinary_upload('q3olokl1', {
        cloud_name: 'teamyowie',
        tags: 'browser_uploads',
    })
    .bind('cloudinarydone', (e, data) => {
        $('#profile-photo').remove();
        $('#progress-bar')
            .addClass('hidden');
        $('#photo-container').prepend(
            $.cloudinary.image(data.result.public_id, {
                radius: 'max',
                height: 150,
                width: 150,
                crop: 'scale',
            })
            .addClass("avatar img-circle img-thumbnail")
            .attr('id', 'profile-photo')
        );
    })
    .bind('cloudinaryprogress', (e, data) => {
        const percent = Math.round((data.loaded*100.0)/data.total)+'%';
        // $('#photo-selector')
        //     .addClass('hidden');
        $('#progress-bar')
            .removeClass('hidden');
        $('.progress-bar-info')
            .css('width', percent)
            .text(percent);
    });
});
