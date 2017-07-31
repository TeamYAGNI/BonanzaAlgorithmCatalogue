const getController = (data) => {
    const getAdminPanel = (req, res) => {
        const context = {
            user: req.user,
            id: req.params.id,
        };
        res.status(200).render('admin', context);
    };

    const createTask = (req, res) => {
        const task = {
            name: req.body.name,
            timelimit: req.body.timelimit,
            memorylimit: req.body.memorylimit,
            description: req.body.description,
            input: req.body.input,
            results: req.body.results,
            tags: req.body.tags,
            users: {},
        };
        data.tasks.create(task)
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                res.status(500).send();
            });
    };

    const updateTask = (req, res) => {
        const id = req.params.id;
        const task = {
            _id: id,
            name: req.body.name,
            timelimit: req.body.timelimit,
            memorylimit: req.body.memorylimit,
            description: req.body.description,
            input: req.body.input,
            results: req.body.results,
            tags: req.body.tags,
            users: req.body.users,
        };
        data.tasks.updateById(task);
    };

    const deleteTask = (req, res) => {
        const id = req.params.id;
        data.tasks.deleteById(id)
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send();
            });
    };

    return {
        getAdminPanel,
        createTask,
        updateTask,
        deleteTask,
    };
};

module.exports = { getController };
