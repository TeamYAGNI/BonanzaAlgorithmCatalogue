/* globals $ */
$(() => {
    $('.open-button').on('click', (ev) => {
        $('.open-button')
            .closest('.collapse-group')
            .find('.collapse')
            .collapse('show');
    });

    $('.close-button').on('click', () => {
        $('.close-button')
            .closest('.collapse-group')
            .find('.collapse')
            .collapse('hide');
    });
});
