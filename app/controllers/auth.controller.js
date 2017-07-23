const passport = require('passport');

const getAuthController = ({ users }) => {
    const getLoginForm = (req, res) => {
        return res.render('login');
    };

    const login = (req, res) => {
        return passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        })(req, res);
    };

    const facebookLogin = (req, res) => {
        passport.authenticate('facebook', { scope: 'email' })(req, res);
    };

    const facebookLoginCallback = (req, res, next) => {
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
        })(req, res, next);
    };

    const logout = (req, res) => {
        req.logout();
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            req.session = null;
            res.redirect('/');
        });
    };

    const getRegisterForm = (req, res) => {
        return res.render('register');
    };

    const register = (req, res) => {
        const user = req.body;

        return users.create(user)
            .then((dbUser) => {
                return res.redirect('/auth/login');
            });
    };

    return {
        getLoginForm,
        login,
        facebookLogin,
        facebookLoginCallback,
        logout,
        getRegisterForm,
        register,
    };
};

module.exports = { getAuthController };
