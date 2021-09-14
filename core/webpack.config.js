const path = require('path');
const nodeExternals = require('webpack-node-externals');
const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs'
  },
  optimization: {
      splitChunks: {
         chunks: 'all',
       },
     },
  devtool: 'source-map',

  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [ {
        // Compile ES2015 using babel
        test: /\.js$/,
        include: [resolve('.')],
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react']
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)?$/,
        include: [resolve('.')],
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /(node_modules|mapbox-gl)/,
      //   loader: 'babel-loader'
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
    },
    {
      test: /\.css$/i,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
      ],
    },
    {
      test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [{
        loader: 'file-loader'
      }]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader'
      }]
    }
    ]
  }
};
