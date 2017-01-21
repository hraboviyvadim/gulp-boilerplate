'use strict';
let webpack    = require('webpack');
let path       = require('path');
let util       = require('gulp-util');
let config     = require('./gulp/config');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const NODE_ENV = process.env.NODE_ENV || 'development';

const configs = {

    // sourcemaps for development version
    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    // entry points of out application
    entry: `${__dirname}/src/js/app.js`,
    output: {
        path: `${__dirname}/build/js`,
        filename: 'app.js',
        publicPath: '/build/'
    },

    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js']
    },

    resolveLoader: {
        extensions: ['.js']
    },

    // add nessessary modules here
    module: {
        rules: [
            // this loader allow you to use ES6/7 syntax and SX transpiling out of the box
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: nodeModulesPath
            }
        ]
    },

    // add nessessary plugins here
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            minChunks: 2
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ]

};

// lets add code minification in case of production environment
if (NODE_ENV == 'production') {
    configs.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                drop_console: true,
                unsafe: true
            }
        })
    );
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    );
    config.entry = ['./app.js', './common.js'];
}

module.exports = configs;
