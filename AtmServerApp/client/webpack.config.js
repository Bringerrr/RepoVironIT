const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devServer: {
    port: 9000
  },
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}
