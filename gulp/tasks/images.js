'use strict';
let gulp = require('gulp');
let config = require('../config');
let imgIcons = config.src.img+'icons/*.*';
let imgSvg = config.src.svg+'*.*';
let tiny = require('gulp-tinypng-nokey');

gulp.task('tinypng', function(cb) {
    gulp.src([config.src.img+'**/*.{png,jpg}', '!'+imgIcons, '!'+imgSvg])
        .pipe(tiny())
        .pipe(gulp.dest(config.dest.img));
});