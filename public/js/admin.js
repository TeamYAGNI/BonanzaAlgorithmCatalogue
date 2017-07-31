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

    $('#add-pair').on('click', (ev) => {
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

    $('#add-task').on('click', (ev) => {
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

        $('#update-task').on('click', (ev) => {
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
            type: 'PUT',
            data: JSON.stringify(task),
            contentType: 'application/json',
            success: (data) => {
                toastr.success('Successfully updated task!');
            },
            error: (error) => {
                toastr.error('Something went wrong. Please try again!');
            },
        });
    });

    $('#delete-task').on('click', (ev) => {
        ev.preventDefault();
        const url = window.location.href;
        $.ajax({
            url: url,
            type: 'POST',
            success: (data) => {
                toastr.success('Successfully deleted task!');
                window.location = '/admin';
            },
            error: (error) => {
                toastr.error('Something went wrong. Please try again!');
            },
        });
    });
});
