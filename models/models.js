/* globals __dirname */

const fs = require('fs');
const path = require('path');

const modelNameSufix = '.model';
const models = {};

const init = () => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes(modelNameSufix))
        .forEach((file) => {
            const modelName = extractModelName(file);
            const modelModulePath = path.join(__dirname, file);
            models[modelName] = require(modelModulePath);
        });

    return models;
};

const extractModelName = (file) => {
    const firstLetter = file.substr(0, 1).toUpperCase();
    const nextLetters = file.substr(1, file.indexOf(modelNameSufix) - 1);

    return firstLetter + nextLetters;
};

module.exports = { init };
