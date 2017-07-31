const getController = () => {
    const getChatForm = (req, res) => {
        res.render('chat', {
            user: req.user,
        });
    };

    return {
        getChatForm,
    };
};

module.exports = { getController };
