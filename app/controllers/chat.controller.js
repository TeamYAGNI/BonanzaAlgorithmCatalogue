const getChatController = () => {
    const getChatForm = (req, res) => {
        if (req.isAuthenticated()) {
            return res.render('chat');
        }

        return res.redirect('/auth/login');
    };

    return {
        getChatForm,
    };
};

module.exports = { getChatController };
