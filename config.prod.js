var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: "./client.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=react-html-attrs,plugins[]=transform-class-properties,plugins[]=transform-decorators-legacy'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions',
                    'sass?outputStyle=expanded'
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "url-loader?mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "file-loader?name=[name].[ext]"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    output: {
        path: __dirname + "/dist/",
        filename: "bundle.min.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nl/),
        new ExtractTextPlugin('style.css', {allChunks: true}),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            environment: process.env.NODE_ENV
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false, compress: {
            warnings: false
        }})
    ]
};
