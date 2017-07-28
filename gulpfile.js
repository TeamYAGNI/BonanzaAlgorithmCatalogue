/* globals __dirname */
/* globals process */
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

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false,
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
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

gulp.task('test', gulpsync.sync([
  'pre-test',
  'test:lint',
  'test:unit',
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
