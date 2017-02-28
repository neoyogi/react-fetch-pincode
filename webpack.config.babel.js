const {resolve} = require('path');
const webpackValidator = require('webpack-validator');
const {getIfUtils} = require('webpack-config-utils');
const currentDir = resolve('.');
let webpack = require('webpack');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function(env) {
    const {ifProd, ifNotProd} = getIfUtils(env);
    return webpackValidator({
        context: currentDir,
        entry: [
            'script-loader!jquery/dist/jquery.min.js',
            'script-loader!bootstrap/dist/js/bootstrap.min.js',
            './app/app.jsx'],
        externals:{
            jquery: 'jQuery'
        },
        plugins:[
            new webpack.ProvidePlugin({
                '$':'jquery',
                'jQuery': 'jquery'
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'report.html',
                openAnalyzer: false,
                generateStatsFile: false,
                logLevel: 'info'
            })
        ],
        output: {
            path: resolve('public'),
            filename: 'bundle.js',
            publicPath: ('/public/'),
            pathinfo: ifNotProd()
        },
        resolve: {
            alias: {
                resetCss: currentDir + '/app/css/reset.css',
                mycss: currentDir + '/app/css/mycss.css',
                bootstrap_base: currentDir + 'bootstrap/dist/css/bootstrap.min.css',
                bootstrap_theme: currentDir + 'bootstrap/dist/css/bootstrap-theme.min.css',
                indexHtml: currentDir + '/app/index.html'
            },
            extensions: ['.js','.css'],
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react','es2015','es2016','stage-2']
                    },
                    test: /\.jsx$/,
                    exclude: /(node_modules|bower_components)/
                },
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015','es2016','stage-2']
                    },
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/
                },

                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.png$/,
                    loader: "url-loader?limit=100000&name=img/[name].[ext]"
                },
                {
                    test: /\.jpg$/,
                    loader: "file-loader?name=img/[name].[ext]"
                },
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
                },

                {
                    test: /\.html$/,
                    loader: "file-loader?name=[name].[ext]"
                },
            ],
        },
        devtool: ifProd('source-map', 'eval')
    });
};
