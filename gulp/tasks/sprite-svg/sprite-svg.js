var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var svgmin      = require('gulp-svgmin');
var svgStore    = require('gulp-svgstore');
var rename      = require('gulp-rename');
var cheerio     = require('gulp-cheerio');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');

var pathToIcons = config.src.iconsSvg + '/**/*.svg';

gulp.task('sprite:svg', function() {
    return gulp
        .src(pathToIcons)
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgStore({ inlineSvg: false }))
        .pipe(cheerio({
            run: extractDataFromIcons,
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ basename: 'sprite' }))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('sprite:svg:watch', function() {
    gulp.watch(pathToIcons, ['sprite:svg']);
});

function extractDataFromIcons($, file) {
    // get data about each icon
    var symbols = $('svg > symbol');
    var data = $('svg > symbol').map(function() {
        var $this = $(this);
        var size = $this.attr('viewBox').split(' ').splice(2);
        return {
            name: $this.attr('id'),
            ratio: Math.ceil((size[0] / size[1]) * 10) / 10
        };
    }).get();

    // remove attributes to make possible applying these styles via css
    symbols.each(function() {
        $(this)
            .find('*')
            .removeAttr('stroke')
            .removeAttr('stroke-width')
            .not('[fill="currentColor"]')
            .removeAttr('fill')
    });

    // create scss file with icon dimensions
    gulp.src(__dirname + '/_sprite-svg.scss')
        .pipe(consolidate('lodash', {
            icons: data
        }))
        .pipe(gulp.dest(config.src.sassGen));

    // crate preview
    gulp.src(__dirname + '/sprite-preview.html')
        .pipe(consolidate('lodash', {
            icons: data
        }))
        .pipe(gulp.dest(config.src.root));
}