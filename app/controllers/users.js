class UserController {
    constructor({ users }) {
        this._users = users;
    }

    getUsers(req, res) {
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

            this._users
                .filterBy(filter, proection, (page - 1) * size, size)
                .then((result) => {
                    res.send(result);
                });
        } else {
            res.redirect('/login');
        }
    }

    getById(req, res, next) {
        const id = req.params.id;
        const user = this._users.findById(id);

        if (!user) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        }

        return res.status(200).send(user);
    }
}

const getUserController = (data) => {
    return new UserController(data);
};

module.exports = { getUserController };
