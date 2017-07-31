/* globals $ */
$(() => {
    $('#tasks-table').dataTable(
        {
            'processing': true,
            'deferRender': true,
        }
    );

    $('[data-toggle="tooltip"]').tooltip();
});
