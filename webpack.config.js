const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  target: 'web',
  mode: 'development',
  entry: {
    web: path.join(__dirname, 'src', 'web.js')
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: 'index.html'
        }
      ]
    },
    host: 'localhost',
    port: 8000
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                ['@babel/react'],
                ['@babel/preset-env', {}]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /.*\.(eot|svg|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'fonts/[name].[ext]'}
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ]
});
