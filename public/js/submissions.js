/* globals $ */

$(() => {
    $('.fall-down').on('click', (ev) => {
        $(ev.target)
            .parent().next('pre')
            .toggleClass('hidden');
    });

    $('[data-toggle="tooltip"]').tooltip();
});
