const getController = () => {
    const getHome = (req, res) => {
        return res.render('index', {
            title: 'Generator-Express MVC',
        });
    };

    return {
        getHome,
    };
};

module.exports = { getController };
