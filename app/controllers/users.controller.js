const getUserController = ({ users }) => {
    const getUsers = (req, res) => {
        if (req.isAuthenticated()) {
            let { pattern, page, size } = req.query;
            pattern = pattern || '';
            page = +page || 1;
            size = +size || 10;

            const filter = {
                username: new RegExp('.*' + pattern + '.*', 'i'),
            };

            const proection = {
                _id: 1,
                username: 1,
                password: 0,
            };

            users
                .filterBy(filter, proection, (page - 1) * size, size)
                .then((result) => {
                    res.send(result);
                });
        } else {
            res.redirect('/auth/login');
        }
    };

    const getById = (req, res, next) => {
        const id = req.params.id;
        const user = users.findById(id);

        if (!user) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        }

        return res.status(200).send(user);
    };

    return {
        getUsers,
        getById,
    };
};

module.exports = { getUserController };
