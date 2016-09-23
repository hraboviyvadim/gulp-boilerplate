var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    'copy:watch',
    'sprite:svg:watch',
    'svgo:watch',
    'nunjucks:watch',
    'webpack:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['server', 'watch'], function() {});
gulp.task('build', ['nunjucks', 'sprite', 'sprite:svg', 'copy','webpack','sass', 'tinypng'], function() {});