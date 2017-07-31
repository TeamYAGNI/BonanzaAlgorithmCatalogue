/* globals $ toastr validator requester */
const url = '/catalogue/categories';

$(() => {
    $('#add-category').on('click', () => {
        const $categoryName = $('#category-name');
        const $summary = $('#summary');

        const category = {
            name: validator.escape($categoryName.val()),
            summary: validator.escape($summary.val()),
        };

        if (validateName(category.name) &&
            validateSummary(category.summary)) {
            requester.post(url, { category })
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

const validateName = (name) => {
    if (!name || !validator.isLength(name, { min: 2, max: 20 })) {
        toastr.error('Category name should be between 2 and 20');
        return false;
    }

    return true;
};

const validateSummary = (summary) => {
    if (!summary || !validator.isLength(summary, { min: 40, max: 1000 })) {
        toastr.error('Category summary should be between 40 and 1000');
        return false;
    }

    return true;
};
