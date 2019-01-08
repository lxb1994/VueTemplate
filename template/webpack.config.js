let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let htmlWebpackPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin')

let isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode:'development',
  entry: {
    build: './src/main.js',
    vendor: ['vue', 'vuex', 'vue-router', 'vuex-persistedstate']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: isProd ? 'http://www.xxxx.com/' : '/dist/',
    filename: 'js/[name].js?[hash]'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
          // the "scss" and "sass" values for the lang attribute to the right configs here.
          // other preprocessors should work out of the box, no loader config like this necessary.
          'scss': 'vue-style-loader!css-loader!sass-loader',
          'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        }
        // other vue-loader options go here
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: !isProd ? 'style-loader!css-loader' : ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
    }, {
      test: /\.(scss|sass)$/,
      loader: !isProd ? 'style-loader!css-loader!sass-loader' : ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: 'font/[name].[ext]?[hash]'
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: 'img/[name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devtool: '#eval-source-map'
}

if (isProd) {
  module.exports.mode = 'production',
  module.exports.devtool = ''
  module.exports.plugins = (module.exports.plugins || []).concat([
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, compress: { warnings: false } }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new ExtractTextPlugin('css/style.css'),
    new htmlWebpackPlugin({
      title: 'vue-resume',
      filename: 'index.html', //通过模板生成的文件名
      template: 'index.html', //模板路径
      inject: 'body', //是否自动在模板文件添加 自动生成的js文件链接
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    })
  ])
}