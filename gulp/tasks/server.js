var gulp        = require('gulp');
var server = require('browser-sync').create();
var config = require('../config');
//webserver
gulp.task('server', function() {
    server.init({
        server: {
            baseDir: config.dest.root
        },
        files: [config.dest.html + '*.html', config.dest.css + '*.css', config.dest.js + '*.js'],
        port: 8080,
        notify: false,
        ghostMode: false,
        online: false,
        open: true
    });
});
module.exports = server;