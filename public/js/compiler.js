/* globals $ */
$(() => {
    $('#submit').on('click', (ev) => {
        $('body').addClass('waiting');
        const body = $('#results-modal .modal-body');
        body.empty();
        const inputForm = $('#input');
        const input = inputForm.val();
        if (input.trim() === '') {
            const p = $('<b/>');
            p.text('You can not pass empty submission!');
            p.appendTo(body);
            inputForm.val('');
            $('body').removeClass('waiting');
        } else {
            const url = window.location.href;
            $.ajax({
                url: url,
                type: 'POST',
                data: input,
                contentType: 'text/plain',
                success: (data) => {
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

                    results.appendTo(body);
                    $('[data-toggle="popover"]').popover();
                    $('body').removeClass('waiting');
                },
                error: (error) => {
                    $('body').removeClass('waiting');
                    console.log(error);
                },
            });
        }
    });

    $('#results').on('click', () => {
        $('body').addClass('waiting');
        const body = $('#results-modal .modal-body');
        if (body.is(':empty')) {
            const p = $('<b/>');
            p.text('You have no submissions yet.');
            p.appendTo(body);
        }
        $('body').removeClass('waiting');
    });

    $('[data-toggle="tooltip"]').tooltip();

    const table = $('#ranking-table').dataTable({
        'processing': true,
        'searching': false,
        'ordering': false,
        'deferRender': true,
        'pageLength': 10,
        'lengthChange': false,
        'pagingType': 'simple',
    });

    $('#avg').on('click', () => {
        $('body').addClass('waiting');
        const body = $('#avg-modal .modal-body');
        body.empty();
        const data = table.api().column(2).data();
        const participantsCount = data.length;
        if (participantsCount > 0) {
            const maxResult = +(data[0].split('/')[1].trim());
            let result = 0;
            let low = maxResult + 1;
            let high = 0;
            let currentEl;
            $.each(data, (index, element) => {
                currentEl = +(element.split('/')[0].trim());
                result += currentEl;
                if (currentEl > high) {
                    high = currentEl;
                }
                if (currentEl < low) {
                    low = currentEl;
                }
            });
            const avg = result / participantsCount;
            const text = `Average result: ${avg} / ${maxResult}
Max achieved: ${high}
Min achieved: ${low}`;
            const pre = $('<pre/>').append(text);
            pre.appendTo(body);
        } else {
            const p = $('<b/>');
            p.text('There are no participants yet.');
            p.appendTo(body);
        }
        $('body').removeClass('waiting');
    });

    $('#refresh').on('click', () => {
        window.location.reload();
    });
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
