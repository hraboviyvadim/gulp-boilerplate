var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var mqpacker = require("css-mqpacker");
var config = require('../config');


var processors = [
    autoprefixer({browsers: ['last 5 versions'], cascade: false}),
    mqpacker({
        sort: function(a, b) {
            A = a.replace(/\D/g, '');
            B = b.replace(/\D/g, '');

            if (isMax(a) && isMax(b)) {
                return B - A;
            } else if (isMin(a) && isMin(b)) {
                return A - B;
            } else if (isMax(a) && isMin(b)) {
                return 1;
            } else if (isMin(a) && isMax(b)) {
                return -1;
            }
            return 1;
        }
    })
];

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

gulp.task('sass', function() {

    return gulp
        .src(config.src.sass + '/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', notify.onError({
            title: 'Sass Error!',
            message: '<%= error.message %>'
        }))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*', ['sass']);
});