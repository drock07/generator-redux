var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  'process.env.NODE_ENV': '"production"'
});

module.exports = {
  entry: [
    './js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new HtmlWebpackPlugin({
      title:'<%= slug %>',
      template: path.join(__dirname, 'index.tpl.html'),
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.styl$/, loader: 'style!css-loader?module!stylus' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
