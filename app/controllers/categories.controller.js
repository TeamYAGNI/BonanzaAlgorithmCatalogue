const getController = ({ categories }) => {
    const getCategories = (req, res) => {
        let { pattern, page, size } = req.query;
        pattern = pattern || '';
        page = +page || 1;
        size = +size || 10;

        const filter = {
            name: new RegExp('.*' + pattern + '.*', 'i'),
        };

        const proection = {
            _id: 0,
            name: 1,
            summary: 0,
        };

        categories
            .filterBy(filter, proection, (page - 1) * size, size)
            .then((result) => {
                const context = {
                    categories: result,
                };
                return res.render('Categories', context );
            });
    };

    const addCategory = (req, res) => {
        const category = {
            name: req.body.category.name,
            summary: req.body.category.summary,
            algorithms: [],
        };

        categories.create(category)
            .then(() => {
                res.status(200).send('Category created successfully!');
            })
            .catch((err) => {
                res.status(500).send('An Error was thrown!');
            });
    };

    const editCategory = (req, res) => {

    };

    const removeCategory = (req, res) => {

    };

    const getCategory = (req, res) => {

    };

    const addAlgorithm = (req, res) => {
        const categoryName = req.params.categoryName;
        const algorithm = req.params.algorithm;

        categories.findByName(categoryName)
            .then((categoryFound) => {
                if (!categoryFound) {
                    return res.status(404).send('There is no such category!');
                }

                if (!algorithm.isValid(algorithm)) {
                    return res.status(404).send('Validation failed!');
                }

                categoryFound.algorithms.push(algorithm);

                return res.status(200).send('Algorithm successfully added!');
            });
    };

    const getAlgorithm = (req, res) => {

    };

    const editAlgorithm = (req, res) => {

    };

    const removeAlgorithm = (req, res) => {

    };

    return {
        getCategories,
        addCategory,
        editCategory,
        removeCategory,
        getCategory,
        addAlgorithm,
        getAlgorithm,
        editAlgorithm,
        removeAlgorithm,
    };
};

module.exports = { getController };
