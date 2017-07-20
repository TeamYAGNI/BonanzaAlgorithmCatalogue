/* globals __dirname */

const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const configJson = require('./config.json');
const env = configJson.NODE_ENV || 'development';
const config = {
  development: {
    root: rootPath,
    app: {
      name: 'bonanzaalgorithmscatalogue',
    },
    port: configJson.PORT || 3000,
    db: 'mongodb://ec2-35-158-165-86.eu-central-1.compute.amazonaws.com/bonanzaalgorithmscatalogue-development',
    // db: 'mongodb://localhost/bonanzaalgorithmscatalogue-development',
  },

  test: {
    root: rootPath,
    app: {
      name: 'bonanzaalgorithmscatalogue',
    },
    port: configJson.PORT || 3000,
    db: 'mongodb://localhost/bonanzaalgorithmscatalogue-test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'bonanzaalgorithmscatalogue',
    },
    port: configJson.PORT || 3000,
    db: 'mongodb://localhost/bonanzaalgorithmscatalogue-production',
  },
};

module.exports = config[env];
