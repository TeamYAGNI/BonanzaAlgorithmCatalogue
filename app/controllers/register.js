class RegisterController {
    constructor({ users }) {
        this._users = users;
    }

    getForm(req, res) {
        return res.render('register');
    }

    register(req, res) {
        const user = req.body;

        return this._users.create(user)
            .then((dbUser) => {
                return res.redirect('/login');
            });
    }
}

const getRegisterController = (data) => {
    return new RegisterController(data);
};

module.exports = { getRegisterController };
