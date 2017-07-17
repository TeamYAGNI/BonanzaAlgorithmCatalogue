const { Router } = require('express');
const edge = require('edge');

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res, next) => {
            return res.render('compiler');
        })
        .post('/', (req, res) => {
            const test = edge.func(`
            async (input) => {
                return "Test " + input.ToString();
            }
            `);
            console.log(req.body.input);
            test(req.body.input, (error, result) => {
                if (error) {
                    throw error;
                }

                console.log(result);
            });
            res.status(200).send();
        });
    app.use('/compiler', router);
};

module.exports = attach;
