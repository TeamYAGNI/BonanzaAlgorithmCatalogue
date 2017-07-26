/* globals $ */
$(() => {
    $('.open-button').on('click', (ev) => {
        $(ev.target)
            .closest('.collapse-group')
            .find('.collapse')
            .collapse('show');
    });

    $('.close-button').on('click', (ev) => {
        $(ev.target)
            .closest('.collapse-group')
            .find('.collapse')
            .collapse('hide');
    });
});
