'use strict';
let gulp           = require('gulp');
let nunjucksRender = require('gulp-nunjucks-render');
let plumber        = require('gulp-plumber');
let gulpif         = require('gulp-if');
let changed        = require('gulp-changed');
let prettify       = require('gulp-prettify');
let frontMatter    = require('gulp-front-matter');
let config         = require('../config');

function renderHtml(onlyChanged) {
    return gulp
        .src([config.src.templates + '/**/[^_]*.njk'])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(nunjucksRender({
            path: config.src.templates,
            data: {
                PRODUCTION: config.production
            },
            envOptions: {
                watch: false,
                trimBlocks: true,
                lstripBlocks: true
            }
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

gulp.task('nunjucks', function() {
    return renderHtml();
});

gulp.task('nunjucks:changed', function() {
    return renderHtml(true);
});

gulp.task('nunjucks:watch', function() {
    gulp.watch([
        config.src.templates + '/**/[^_]*.njk'
    ], ['nunjucks:changed']);

    gulp.watch([
        config.src.templates + '/**/_*.njk'
    ], ['nunjucks']);
});