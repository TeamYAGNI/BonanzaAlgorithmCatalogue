const getController = () => {
    const getChatForm = (req, res) => {
        if (req.isAuthenticated()) {
            res.render('chat', {
                user: req.user,
            });
        } else {
            res.redirect('/auth/login');
        }
    };

    return {
        getChatForm,
    };
};

module.exports = { getController };
