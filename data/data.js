/* globals __dirname */

const fs = require('fs');
const path = require('path');

const dataNameSuffix = '.data';

const init = (db) => {
    const data = {};
    fs.readdirSync(__dirname)
        .filter((file) => file.includes(dataNameSuffix))
        .forEach((file) => {
            const dataName = file.substr(0, file.indexOf(dataNameSuffix));
            const dataModulePath = path.join(__dirname, file);
            data[dataName] = require(dataModulePath).getData(db);
        });
    return data;
};

module.exports = { init };
