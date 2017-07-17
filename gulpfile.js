/* globals __dirname */
/* globals process */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');
const gulpsync = require('gulp-sync')(gulp);
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');

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
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulp.dest('.'));
});

gulp.task('test:lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format());
    //.pipe(eslint.failAfterError());
});

gulp.task('test:unit', () => {
  return gulp.src('./tests/unit/**/*.js', { read: false })
    .pipe(mocha({
      reporter: 'nyan',
    }))
    .pipe(istanbul.writeReports());
});

gulp.task('pre-test', () => {
  return gulp.src([
    './app/**/*.js',
    './config/*.js',
    '!./node_modules/',
    '!./test/',
    '!./public/',
    '!./coverage/',
    './app.js',
    ])
    .pipe(istanbul({
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', gulpsync.sync([
  'pre-test',
  'test:lint',
  'test:unit',
]));
