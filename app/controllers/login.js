const passport = require('passport');

class LoginController {
    getForm(req, res) {
        return res.render('login');
    }

    login(req, res) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        });
    }
}

const getLoginController = () => {
    return new LoginController();
};

module.exports = { getLoginController };