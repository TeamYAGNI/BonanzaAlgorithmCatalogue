const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  mocha = require('gulp-mocha'),
  gulpsync = require('gulp-sync')(gulp),
  eslint = require('gulp-eslint');

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false
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
  'develop'
]);

gulp.task('lint-fix', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format());
});

gulp.task('test:lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test:unit', () => {
  return gulp.src('./tests/unit/**/*.js', { read: false })
    .pipe(mocha({
      reporter: 'nyan',
    }));
});

gulp.task('test', gulpsync.sync([
  'test:lint',
  'test:unit'
]));
