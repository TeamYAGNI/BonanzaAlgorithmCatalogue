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

    // $('#tasks-table tbody').on('click', 'tr', (ev) => {
    //     $(ev.target).toggleClass('active');
    // });

    // $('#tasks-table tbody')
    // .on('mouseenter', 'td', (ev) => {
    //     const columnIndex = table.api().cell(ev.target).index().column;
    //     $(table.api().cells().nodes()).removeClass('active');
    //     $(table.api().column(columnIndex).nodes()).addClass('active');
    // });

    //     "initComplete": function () {
    //     var api = this.api();
    //     api.$('td').click(function (ev) {
    //         api.search($(ev.target).text()).draw();
    //     });
    // },
