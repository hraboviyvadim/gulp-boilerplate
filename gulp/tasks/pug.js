let gulp = require('gulp');
let pug = require('gulp-pug');
let config = require('../config');
let prettify = require('gulp-prettify');
let gulpif = require('gulp-if');
let changed = require('gulp-changed');

function buildHTML(onlyChanged) {
  return gulp.src([config.src.templates + '/**/[^_]*.pug'])
    .pipe(gulpif(onlyChanged, changed(config.dest.html)))
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(prettify({
      indent_size: 2,
      wrap_attributes: 'auto', // 'force'
      preserve_newlines: true,
      // unformatted: [],
      end_with_newline: true
    }))
    .pipe(gulp.dest(config.dest.html));
}

gulp.task('pug', function() {
  return buildHTML();
});
gulp.task('pug:changed', function() {
  return buildHTML(true);
});
gulp.task('pug:watch', function(done) {
  gulp.watch([
    config.src.templates + '/**/[^_]*.pug'
  ], gulp.series('pug:changed'));

  gulp.watch([
    config.src.templates + '/**/_*.pug'
  ], gulp.series('pug'));
  done();
});