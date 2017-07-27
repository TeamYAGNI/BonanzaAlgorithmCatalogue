/* globals __dirname */

const fs = require('fs');
const path = require('path');

const dataNameSufix = '.data';

const init = (db) => {
    const data = {};
    fs.readdirSync(__dirname)
        .filter((file) => file.includes(dataNameSufix))
        .forEach((file) => {
            const dataName = file.substr(0, file.indexOf(dataNameSufix));
            const dataModulePath = path.join(__dirname, file);
            data[dataName] = require(dataModulePath).getData(db);
        });
    return data;
};

module.exports = { init };
