/* globals $ toastr validator requester */

$(() => {
    $('#add-algo').on('click', () => {
        const $algoName = $('#algo-name');
        const algoCategory = $('#algo-category').val();
        const $algoNote = $('#algo-note');
        const url = ('/catalogue/categories/' + algoCategory.toLowerCase());

        const algo = {
            name: validator.escape($algoName.val()),
            note: validator.escape($algoNote.val()),
        };

        if (validateAlgoName(algo.name) &&
            validateAlgoNote(algo.note)) {
            requester.post(url, { algo })
                .then((response) => {
                    toastr.success(response);

                    setTimeout(() => {
                        window.location.href = url;
                    }, 1000);
                })
                .catch((response) => toastr.error(response.responseText));
        }
    });
});

const validateAlgoName = (name) => {
    if (!name || !validator.isLength(name, { min: 2, max: 30 })) {
        toastr.error('Algo name should be between 2 and 30');
        return false;
    }

    return true;
};

const validateAlgoNote = (note) => {
    if (!note || !validator.isLength(note, { min: 40, max: 1000 })) {
        toastr.error('Algo note should be between 40 and 1000');
        return false;
    }

    return true;
};
