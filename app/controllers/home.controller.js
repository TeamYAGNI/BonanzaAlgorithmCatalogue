class HomeController {
    getHome(req, res) {
        return res.render('index', {
            title: 'Generator-Express MVC',
        });
    }
}

const getHomeController = () => {
    return new HomeController();
};

module.exports = { getHomeController };
