var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer"),
      process: require.resolve("process/browser")
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: false,
    port: 8080,
    proxy: {
      '/api/**': {
        target: 'http://localhost:9000'
      }
    },
  },
};