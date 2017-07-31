/* globals $ toastr */
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
        const currentInput = inputTextArea.val();
        const currentResult = resultTextArea.val();
        if (currentInput === '' || currentResult === '') {
            toastr.error('Input/Result pair must not be empty');
        } else {
            input.push(currentInput);
            results.push(currentResult);
        }

        inputTextArea.val('');
        resultTextArea.val('');
    });

    $('#submit').on('click', (ev) => {
        ev.preventDefault();

        const nameForm = $('#name');
        const timelimitForm = $('#timelimit');
        const memorylimitForm = $('#memorylimit');
        const descriptionForm = $('#description');
        const inputTextArea = $('#input');
        const resultTextArea = $('#result');

        const timelimitValue = timelimitForm.val();
        if (Number.isNaN(Number(timelimitValue))) {
            toastr.error('Timelimit value must be valid number!');
            timelimitForm.val('');
            return;
        }

        const memorylimitValue = memorylimitForm.val();
        if (Number.isNaN(Number(memorylimitValue))) {
            toastr.error('Memory limit value must be valid number!');
            memorylimitForm.val('');
            return;
        }

        const inputValue = inputTextArea.val();
        const resultValue = resultTextArea.val();
        if (inputValue && resultValue) {
            input.push(inputValue);
            results.push(resultValue);
        }

        const tags = [];
        $.each($('#tags option:selected'), (index, option) => {
            tags.push($(option).attr('data-token'));
        });
        $('#tags').val('').selectpicker('refresh');

        const task = {
            name: nameForm.val(),
            timelimit: timelimitValue,
            memorylimit: memorylimitValue,
            description: descriptionForm.val(),
            input: input,
            results: results,
            tags: tags,
        };

        nameForm.val('');
        timelimitForm.val('');
        memorylimitForm.val('');
        descriptionForm.val('');
        inputTextArea.val('');
        resultTextArea.val('');
        input = [];
        results = [];

        const url = window.location.href;
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(task),
            contentType: 'application/json',
            success: (data) => {
                toastr.success('Successfully created task!');
            },
            error: (error) => {
                toastr.error('Something went wrong. Please try again!');
            },
        });
    });

    $('#delete').on('click', (ev) => {
        ev.preventDefault();
        const url = window.location.href;
        $.ajax({
            url: url,
            type: 'POST',
            success: (data) => {
                toastr.success('Successfully deleted task!');
            },
            error: (error) => {
                toastr.error('Something went wrong. Please try again!');
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
