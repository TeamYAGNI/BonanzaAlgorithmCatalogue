const getController = (data) => {
    const getAdminPanel = (req, res) => {
        if (req.params.id) {
            data.tasks.findById(req.params.id)
                .then((task) => {
                    const context = {
                        user: req.user,
                        task: task,
                    };
                    res.status(200).render('admin', context);
                });
        } else {
            const context = {
                user: req.user,
            };
            res.status(200).render('admin', context);
        }
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
        data.tasks.findById(id)
            .then((t) => {
                if (req.body.input.join() === t.input.join() &&
                    req.body.results.join() === t.results.join()) {
                    t.name = req.body.name;
                    t.timelimit = req.body.timelimit;
                    t.memorylimit = req.body.memorylimit;
                    t.description = req.body.description;
                    t.tags = req.body.tags;
                    data.tasks.updateById(t)
                        .then(() => {
                            res.status(200).send();
                        })
                        .catch((err) => {
                            res.status(500).send();
                        });
                } else {
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

                    Promise.all([data.tasks.create(task),
                    data.tasks.deleteById(id)])
                        .then(() => {
                            res.status(200).send();
                        })
                        .catch((err) => {
                            res.status(500).send();
                        });
                }
            });
    };

    const deleteTask = (req, res) => {
        const id = req.params.id;
        data.tasks.deleteById(id)
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
        updateTask,
        deleteTask,
    };
};

module.exports = { getController };
