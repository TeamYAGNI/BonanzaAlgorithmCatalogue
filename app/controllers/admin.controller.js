const getAdminController = (data) => {
    const getAdminPanel = (req, res) => {
        res.status(200).render('admin');
    };

    const createTask = (req, res) => {
        const task = {
            name: req.body.name,
            input: req.body.input.split(','),
            results: req.body.results.split(','),
            timelimit: req.body.timelimit,
        };
        data.tasks.create(task)
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                res.status(500).send();
            });
    };

    return {
        getAdminPanel,
        createTask,
    };
};

module.exports = { getAdminController };
