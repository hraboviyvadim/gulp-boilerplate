var gulp = require('gulp');
var config = require('../config');
var imgIcons = config.src.img+'icons/*.*';
var imgSvg = config.src.img+'svg/*.*';
var tiny = require('gulp-tinypng-nokey');

gulp.task('tinypng', function(cb) {
    gulp.src([config.src.img+'**/*.*', '!'+imgIcons, '!'+imgSvg])
        .pipe(tiny())
        .pipe(gulp.dest(config.dest.img));
});