const getController = () => {
    const getHome = (req, res) => {
        return res.render('index', {
            title: 'Generator-Express MVC',
            user: req.user,
        });
    };

    return {
        getHome,
    };
};

module.exports = { getController };
