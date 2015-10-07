var path = require('path'),
    basePath = path.join(__dirname, '..', 'web', 'app'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: basePath,
    entry: {
        app: ['webpack/hot/only-dev-server', path.join(basePath, 'index.js')]
    },
    output: {
        path: path.join(basePath, '..', 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'web/templates/index.html'
        })
    ]
};
