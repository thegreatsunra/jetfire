/* ====================================
 *  gulpfile.js
 *  generated using generator-jetfire v0.1.6
 * ===================================== */

'use strict';

// Load plugins
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plugins = require('gulp-load-plugins')();

// Watch Files For Changes & Reload
gulp.task('serve', function () {
  browserSync({
    notify: false,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.css'], reload);
  gulp.watch(['app/styles/**/*.scss'], ['sass']);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
    'app/scripts/**/*.js',
    'gulpfile.js',
    'Gruntfile.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.notify({ message: 'jshint task complete!' }))
    .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});

// Compile Sass files
gulp.task('sass', function () {
  gulp.src('app/styles/**/*.scss')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest('app/styles'));
});

// Default task
gulp.task('default', ['serve'], function() {
    gulp.start(['jshint', 'sass']);
});
