/* globals __dirname */
const fs = require('fs');
const path = require('path');

const controllerNameSufix = '.controller';
const controllers = {};

const init = (data, passport) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes(controllerNameSufix))
        .forEach((file) => {
            const controllerName = file
                .substr(0, file.indexOf(controllerNameSufix));
            const conrollerModulePath = path.join(__dirname, file);
            controllers[controllerName] = require(conrollerModulePath)
                .getController(data, passport);
        });

    return controllers;
};

module.exports = { init };
