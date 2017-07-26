/* globals $ */
$(() => {
    $('#submit').on('click', () => {
        const url = window.location.href;
        const input = $('#input').val();
        $.ajax({
            url: url,
            type: 'POST',
            data: input,
            contentType: 'text/plain',
            success: (data) => {
                $('.modal-body').empty();

                const results = $('<p/>');

                for (let i = 0; i < data.length; i += 1) {
                    const singleResult = $('<a/>');
                    singleResult.attr('role', 'button');
                    singleResult.attr('data-toggle', 'popover');
                    singleResult.attr('data-placement', 'bottom');
                    singleResult.addClass('btn btn-secondary');
                    if (data[i].status === 'passed') {
                        const glyph = $('<span/>')
                        .addClass('glyphicon glyphicon-ok');
                        glyph.attr('aria-hidden', 'true');
                        singleResult.html(glyph);
                        singleResult.attr('title', 'Passed');
                        singleResult.attr('data-content', data[i].message);
                    } else {
                        const glyph = $('<span/>')
                        .addClass('glyphicon glyphicon-remove');
                        glyph.attr('aria-hidden', 'true');
                        singleResult.html(glyph);
                        singleResult.attr('title', data[i].reason);
                        singleResult.attr('data-content', data[i].message);
                    }
                    singleResult.appendTo(results);
                }

                results.appendTo($('.modal-body'));
                $('[data-toggle="popover"]').popover();
            },
            error: (error) => {
                console.log(error);
            },
        });
    });

    $('[data-toggle="tooltip"]').tooltip();
});

// if we need to dynamically add tooltip ->
// const tooltip = $('<a/>');
// tooltip.attr('href', document.location.origin + '/catalogue');
// tooltip.attr('role', 'button');
// tooltip.addClass('btn btn-secondary pull-left');
// tooltip.attr('data-toggle', 'tooltip');
// tooltip.attr('data-placement', 'bottom');
// tooltip.attr('title', 'Go to catalogue');
// tooltip.text('Catalogue');
// tooltip.prependTo($('.modal-footer'));
// $('[data-toggle="tooltip"]').tooltip();
