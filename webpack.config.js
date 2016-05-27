
var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {

  entry: './src/js/example.js',
  //entry: './src/js/index.js',

  output: {
    path: './build',
    filename: 'build.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.sass$/,
        loaders: ['style','css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]

};
