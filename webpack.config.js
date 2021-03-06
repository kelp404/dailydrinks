const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env = {}) => ({
  target: 'web',
  mode: env.mode || 'development',
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
        test: /\.scss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /.*\.(eot|svg|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: env.mode === 'production' ? '.' : '/'
            }
          }
        ]
      }
    ]
  },
  plugins: (() => {
    const result = [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new webpack.ProvidePlugin({$: 'jquery'})
    ];
    if (env.mode === 'production') {
      result.push(
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            discardComments: {removeAll: true}
          }
        })
      );
    }
    return result;
  })()
});
