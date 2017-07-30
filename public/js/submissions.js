/* globals $ */

$(() => {
    $('.fall-down').on('click', (ev) => {
        $(ev.target)
            .parent().next('pre')
            .toggleClass('hidden');
    });

    $('#back').on('click', () => {
        window.location.href = window.location.href
        .substring(0, window.location.href.lastIndexOf('/'));
    });
});
