const getHomeController = () => {
    const getHome = (req, res) => {
        return res.status(200).render('index', {
            title: 'Generator-Express MVC',
        });
    };

    return {
        getHome,
    };
};

module.exports = { getHomeController };
