var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bonanzaalgorithmscatalogue'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bonanzaalgorithmscatalogue-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'bonanzaalgorithmscatalogue'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bonanzaalgorithmscatalogue-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'bonanzaalgorithmscatalogue'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bonanzaalgorithmscatalogue-production'
  }
};

module.exports = config[env];
