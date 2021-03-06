const gulp = require('gulp');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const paths = require('../paths');
const browserify = require('browserify');
const glob = require('glob');
const streamify = require('gulp-streamify');
const babelify = require('babelify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const	runSequence = require('run-sequence');
const envify = require('envify/custom');

gulp.task('build:transform', function (done) {
  return browserify(paths.app)
    .transform(envify({
      APP_ENV: process.env.APP_ENV
    }))
    .transform(babelify, { 
      presets: ["es2015", "react"]
    })
    .bundle()
    .pipe(source('all.js'))
    .pipe(gulp.dest(paths.output + "/assets/js"))
    .pipe(rename('all.min.js'))
    .pipe(streamify(concat('all.min.js')))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.output + "/assets/js"));
});

gulp.task('build:copy', ['build:copy:html', 'build:copy:images']);

gulp.task('build:copy:html', function () {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.output));
});

gulp.task('build:copy:images', function () {
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build:transform', 'build:copy'],
    callback
  );
});