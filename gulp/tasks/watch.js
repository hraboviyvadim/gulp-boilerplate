var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');

// gulp.task('watch', [
//     'sprite:watch',
//     'sass:watch',
//     'copy:watch',
//     'sprite:svg:watch',
//     'svgo:watch',
//     'nunjucks:watch',
//     'webpack:watch'
// ], function() {});
gulp.task('watch', gulp.parallel(
  'sprite:watch',
  'sass:watch',
  'copy:watch',
  'sprite:svg:watch',
  'svgo:watch',
  'nunjucks:watch',
  // 'pug:watch',
  'webpack:watch',
));


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', gulp.series('server', 'watch'));
gulp.task('build', gulp.series('nunjucks', 'sprite', 'sprite:svg', 'copy','webpack','sass:build', 'tinypng'));
// gulp.task('build', gulp.series('pug', 'sprite', 'sprite:svg', 'copy','webpack','sass:build', 'tinypng'));