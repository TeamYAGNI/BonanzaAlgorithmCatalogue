/* globals $ */
let input = [];
let results = [];
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

    $('#add').on('click', (ev) => {
        ev.preventDefault();
        const inputTextArea = $('#input');
        const resultTextArea = $('#result');

        input.push(inputTextArea.val());
        results.push(resultTextArea.val());

        inputTextArea.val('');
        resultTextArea.val('');
    });

    $('#submit').on('click', (ev) => {
        ev.preventDefault();
        const nameForm = $('#name');
        const timelimitForm = $('#timelimit');
        const descriptionForm = $('#description');
        const task = {
            name: nameForm.val(),
            timelimit: timelimitForm.val(),
            description: descriptionForm.val(),
            input: input,
            results: results,
        };
        nameForm.val('');
        timelimitForm.val('');
        descriptionForm.val('');
        input = [];
        results = [];
        const url = window.location.href + '/task';
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(task),
            contentType: 'application/json',
            success: (data) => {
                console.log('i am in success callback');
            },
            error: (error) => {
                console.log('i am in error callback');
                console.log(error);
            },
        });
    });
});

    // $('#add').on('click', () => {
    //     const container = $(document.createDocumentFragment());
    //
    //     const input = $('<div/>').addClass('pull-left');
    //     const label = $('<label/>').text('Input:');
    //     const textarea = $('<textarea/>');
    //     textarea.attr('form', 'taskform');
    //     textarea.attr('wrap', 'hard');
    //     textarea.attr('required', 'required');
    //     textarea.attr('name', 'input');
    //     textarea.appendTo(label);
    //     label.appendTo(input);
    //     input.appendTo(container);
    //
    //     const results = $('<div/>').addClass('pull-right');
    //     const rlabel = $('<label/>').text('Results:');
    //     const rtextarea = $('<textarea/>');
    //     rtextarea.attr('form', 'taskform');
    //     rtextarea.attr('wrap', 'hard');
    //     rtextarea.attr('required', 'required');
    //     rtextarea.attr('name', 'results');
    //     rtextarea.appendTo(rlabel);
    //     rlabel.appendTo(results);
    //     results.appendTo(container);
    //
    //     container.appendTo($('#pairs'));
    // });
