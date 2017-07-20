const passport = require('passport');

class AuthController {
    constructor({ users }) {
        this._users = users;
    }

    getLoginForm(req, res) {
        return res.render('login');
    }

    login(req, res) {
        return passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        })(req, res);
    }

    logout(req, res) {
        req.logout();
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            req.session = null;
            res.redirect('/');
        });
    }

     getRegisterForm(req, res) {
        return res.render('register');
    }

    register(req, res) {
        const user = req.body;

        return this._users.create(user)
            .then((dbUser) => {
                return res.redirect('/auth/login');
            });
    }
}

const getAuthController = (data) => {
    return new AuthController(data);
};

module.exports = { getAuthController };
