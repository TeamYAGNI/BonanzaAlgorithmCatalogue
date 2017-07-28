const getAdminController = (data) => {
    const getAdminPanel = (req, res) => {
        res.status(200).render('admin');
    };

    const createTask = (req, res) => {
        const task = {
            name: req.body.name,
            timelimit: req.body.timelimit,
            memorylimit: req.body.memorylimit,
            description: req.body.description,
            input: req.body.input,
            results: req.body.results,
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
