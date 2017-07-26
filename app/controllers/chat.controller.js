const getChatController = () => {
    const getChatForm = (req, res) => {
        return res.render('chat');
    };

    return {
        getChatForm,
    };
};

module.exports = { getChatController };
