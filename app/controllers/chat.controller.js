const getController = () => {
    const getChatForm = (req, res) => {
        if (req.isAuthenticated()) {
            res.render('chat');
        } else {
            res.redirect('/auth/login');
        }
    };

    return {
        getChatForm,
    };
};

module.exports = { getController };
