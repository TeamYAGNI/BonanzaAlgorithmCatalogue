/* globals $ */

$(() => {
    $('.member-img-small').html(
        $.cloudinary.image($('.member-img-small').text().trim(), {
            radius: 'max',
            height: 38,
            width: 38,
            crop: 'scale',
        })
            .addClass('avatar img-circle img-thumbnail')
    );
    $('.member-img-big').html(
        $.cloudinary.image($('.member-img-big').text().trim(), {
            radius: 'max',
            height: 150,
            width: 150,
            crop: 'scale',
        })
            .addClass('avatar img-circle img-thumbnail')
    );
    $('.glyphicon-chevron-down').on('click', (ev) => {
        $(ev.target).parent().parent().next().toggle();
    });
    $('[data-toggle="tooltip"]').tooltip();
});
