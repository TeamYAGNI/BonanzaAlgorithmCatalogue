/* globals __dirname, process */
/* eslint-disable no-invalid-this */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');
const gulpsync = require('gulp-sync')(gulp);
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const pm2 = require('pm2');

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false,
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop',
]);

gulp.task('lint-fix', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!coverage/**'])
    .pipe(plumber())
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulp.dest('.'));
});

gulp.task('pre-test', () => {
  return gulp.src([
    './app.js',
    './app/**/*.js',
    './config/*.js',
    './data/*.js',
    './data/**/*.js',
    './db/*.js',
    './models/*.js',
    '!./node_modules/',
    '!./public/',
    '!./tests/',
    '!./coverage/',
  ])
    .pipe(istanbul({
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test:lint', () => {
  return gulp.src(['**/*.js', '!./node_modules/', '!coverage/**', '!public/**'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test:unit', () => {
  return gulp.src('./tests/unit/**/*.js', { read: false })
    .pipe(plumber())
    .pipe(mocha({
      colors: false,
      reporter: 'nyan',
    }))
    .on('error', (err) => {
      process.exit(2);
    })
    .pipe(istanbul.writeReports());
});

gulp.task('test:integration', () => {
  return gulp.src('./tests/integration/**/*.js', { read: false })
    .pipe(plumber())
    .pipe(mocha({
      colors: false,
      reporter: 'nyan',
    }))
    .on('error', (err) => {
      process.exit(2);
    })
    .pipe(istanbul.writeReports());
});

const configJson = require('./config/config.json');
const models = require('./models').init();

gulp.task('server-start', () => {
  configJson['NODE_ENV'] = 'test';
  configJson['PORT'] = 3001;
  const config = require('./config/config');
  return Promise.resolve()
    .then(() => require('./db').init(config.db))
    .then((db) => require('./data').init(db, models))
    .then((data) => require('./config/express').init(data, config))
    .then((app) => {
      return app.listen(config.port, () =>
        console.log(`Express server listening on port:${config.port}`));
    })
    .then((server) => require('./config/socket').init(server));
});

const { MongoClient } = require('mongodb');
gulp.task('server-stop', () => {
  const config = require('./config/config');
  return MongoClient.connect(config.db)
    .then((db) => {
      configJson['NODE_ENV'] = 'development';
      configJson['PORT'] = 3000;
      return db.dropDatabase();
    });
});
gulp.task('test:browser', ['server-start'], () => {
  return gulp.src('./tests/browser/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      colors: false,
      reporter: 'nyan',
      timeout: 10000,
    }))
    .once('end', () => {
      gulp.start('server-stop');
    });
});

gulp.task('test', gulpsync.sync([
  'pre-test',
  'test:lint',
  'test:unit',
  'test:integration',
  'test:browser',
]));

gulp.task('serve', () => {
  pm2.connect(false, () => {
    pm2.start({
      name: 'app',
      script: './node_modules/gulp/bin/gulp.js',
      args: 'develop',
      force: true,
    }, (err, apps) => {
      pm2.disconnect();
      if (err) {
        process.exit(2);
      }
    });
  });
});
