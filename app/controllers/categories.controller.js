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
                    user: req.user,
                };
                return res.render('categories', context);
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

    const removeCategory = (req, res) => {
        const categoryName = req.params.categoryName;

        categories.remove({ name: categoryName });
        res.status(200).send('Category removed successfully!');
    };

    const getCategory = (req, res) => {
        const categoryName = req.params.categoryName;

        return categories.findByName(categoryName)
            .then((categoryFound) => {
                const context = {
                    category: categoryFound,
                    user: req.user,
                };
                return res.render('algorithms', context);
            });
    };

    const addAlgorithm = (req, res) => {
        const categoryName = req.params.categoryName;

        const algo = {
            name: req.body.algo.name,
            note: req.body.algo.note,
        };

        categories.findByName(categoryName)
            .then((categoryFound) => {
                if (!categoryFound) {
                    return res.status(404).send('There is no such category!');
                }

                categoryFound.algorithms.push(algo);
                categories.updateByName(categoryFound);

                return res.status(200).send('Algorithm successfully added!');
            });
    };

    const removeAlgorithm = (req, res) => {
        const categoryName = req.params.categoryName;
        const algoName = req.body.algoName;

        categories.findByName(categoryName)
            .then((categoryFound) => {
                if (!categoryFound) {
                    return res.status(404).send('No such category!');
                }

                categoryFound.algorithms = categoryFound.algorithms
                    .filter((a) => a.name !== algoName);

                categories.updateByName(categoryFound);

                return res.status(200).send('Algo is removed!');
            });
    };

    return {
        getCategories,
        addCategory,
        removeCategory,
        getCategory,
        addAlgorithm,
        removeAlgorithm,
    };
};

module.exports = { getController };
