/* globals __dirname */
const fs = require('fs');
const path = require('path');

const routerNameSufix = '.router';

const attachTo = (app, controllers, user) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes(routerNameSufix))
        .forEach((file) => {
            const router = path.join(__dirname, file);
            require(router).attachTo(app, controllers, user);
        });
};

module.exports = { attachTo };
