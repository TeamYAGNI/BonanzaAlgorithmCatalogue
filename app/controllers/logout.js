class LogoutController {
    logout(req, res) {
        req.logout();
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            req.session = null;
            res.redirect('/');
        });
    }
}

const getLogoutController = () => {
    return new LogoutController();
};

module.exports = { getLogoutController };
