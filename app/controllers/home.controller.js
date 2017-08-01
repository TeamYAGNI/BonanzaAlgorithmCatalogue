const getController = () => {
    const getHome = (req, res) => {
        return res.status(200).render('index', {
            title: 'BonanzaAlgorithmsCatalogue',
            user: req.user,
        });
    };

    return {
        getHome,
    };
};

module.exports = { getController };
