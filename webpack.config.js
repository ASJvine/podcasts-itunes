const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ENV = process.env.NODE_ENV || 'development'
const isProd = ENV === 'production'
const WebpackErrorNotificationPlugin = require('webpack-error-notification')

//FROM https://github.com/jtangelder/sass-loader
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  cache: !isProd,
  context: path.resolve(__dirname, 'src'),
  devtool: isProd ? 'cheap-source-map' : 'cheap-module-eval-source-map',
  entry: (function () {
    const entries = []
    if (!isProd) {
      entries.push(
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server'
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
      )
    }
    return entries.concat('./index.js')
  })(),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        loader: extractSass.extract({
            loader: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallbackLoader: "style-loader"
        })
      },
      {
        test: /\.(png|jpg|wav)$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    unsafeCache: true,
  },
  plugins: (function () {
    const plugins = [
      new WebpackErrorNotificationPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV),
        },
      }),
      extractSass
    ]

    if (!isProd) {
      plugins.push(new HtmlWebpackPlugin({ template: 'index.ejs' }))
      plugins.push(new webpack.HotModuleReplacementPlugin())// enable HMR globally
      plugins.push(new webpack.NamedModulesPlugin()) // prints more readable module names in the browser console on HMR updates)
    }

    if (isProd) {
      plugins.push(new webpack.optimize.OccurrenceOrderPlugin(false))
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        screwIe8: true,
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
        sourceMap: true,
      }))
    }

    return plugins
  }()),
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: !isProd,
    publicPath: '/',
    historyApiFallback: true,
  },
}
