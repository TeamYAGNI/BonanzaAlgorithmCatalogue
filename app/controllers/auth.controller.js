const getController = ({ users }, passport) => {
    const getLoginForm = (req, res) => {
        return res.render('login');
    };

    const login = (...args) => {
        return passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        })(...args);
    };

    const facebookLogin = (req, res) => {
        passport.authenticate('facebook-login', { scope: 'email' })(req, res);
    };

    const facebookLoginCallback = (req, res) => {
        passport.authenticate('facebook-login', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        })(req, res);
    };

    const googleLogin = (req, res, next) => {
        passport
            .authenticate('google-login',
            { scope: ['profile', 'email'] })(req, res, next);
    };

    const googleLoginCallback = (req, res, next) => {
        passport.authenticate('google-login', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
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

const register = (...args) => {
    return passport.authenticate('local-register', {
        successRedirect: '/auth/login',
        failureRedirect: '/',
        failureFlash: true,
    })(...args);
};

return {
    getLoginForm,
    login,
    facebookLogin,
    facebookLoginCallback,
    googleLogin,
    googleLoginCallback,
    logout,
    getRegisterForm,
    register,
};
};

module.exports = { getController };
