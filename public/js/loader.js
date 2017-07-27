/* globals $ */

if (window.location.hash && window.location.hash === '#_=_') {
    window.location.hash = '';
}

$(() => {
    setTimeout(() => {
        $('.circle-loader').toggleClass('load-complete');
        $('.checkmark').show('fast');
    }, 500);

    setTimeout(() => {
        $('.circle-loader').fadeOut();
        $('.checkmark').fadeOut();
    }, 1000);

    $('a.request').on('click', () => {
        $('.circle-loader').toggleClass('load-complete');
        $('.circle-loader').show('fast');
    });
});
