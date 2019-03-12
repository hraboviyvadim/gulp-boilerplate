var gulp = require('gulp');
var config = require('../config');
var imgIcons = config.src.img+'icons/*.*';
var imgSvg = config.src.img+'svg/*.*';
// copy static files
gulp.task('copy', function(done) {
  gulp.src([config.src.img+'**/*.*', '!'+imgIcons, '!'+imgSvg])
   .pipe(gulp.dest(config.dest.img));
   gulp.src(config.src.root+'fonts/*.*')
   .pipe(gulp.dest(config.dest.css+'fonts/'));
   gulp.src(config.src.root+'video/*.*')
   .pipe(gulp.dest(config.dest.root+'video/'));
    gulp.src(config.src.vendors+'**/*.*')
   .pipe(gulp.dest(config.dest.vendors));
  done();
});

gulp.task('copy:watch', function(done) {
    gulp.watch(config.src.img+'*', gulp.series('copy'));
    gulp.watch(config.src.vendors+'*', gulp.series('copy'));
    gulp.watch(config.src.root+'fonts/*', gulp.series('copy'));
    done();
});

