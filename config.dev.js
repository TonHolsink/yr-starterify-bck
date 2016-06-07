var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack/hot/only-dev-server');
    }
}

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: "inline-sourcemap",
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
                /*
                 sourceMap: Provides name of the files including line number during debug and inspect elements
                 localIdentName: Adds the name of the style in front of the unique hash
                 SourceMap currently doesn't work because of this bug:
                 https://github.com/webpack/style-loader/pull/96
                 https://github.com/webpack/style-loader/pull/124
                 [ 'style', 'css?sourceMap&localIdentName=[name]__[local]___[hash:base64:5]', 'autoprefixer?browsers=last 3 versions', 'sass?sourceMap&outputStyle=expanded' ]
                 */
                loaders: ['style', 'css?localIdentName=[name]__[local]___[hash:base64:5]', 'autoprefixer?browsers=last 3 versions', 'sass?outputStyle=expanded']
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
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nl/),
        new ExtractTextPlugin('style.css', {allChunks: true}),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            environment: process.env.NODE_ENV
        })
    ]
};
