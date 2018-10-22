const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader');
const nodeEnv = process.env.NODE_ENV || 'development';
let isPro = nodeEnv === 'production';
//console.log("当前运行环境：", isPro ? 'production' : 'development')
var pre_fix = isPro ? '[name].[chunkhash]' : '[name]'
let plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: pre_fix + ".css",
    //chunkFilename: "[id].css"
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.SplitChunksPlugin({
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
      //打包重复出现的代码
      vendor: {
        chunks: 'initial', //// 只对入口文件处理
        minChunks: 2,
        maxInitialRequests: 5, // The default limit is too small to showcase the effect
        minSize: 30000, // This is example is too small to create commons chunks
        name: 'vendor'
      },
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    }
  }),
  new webpack.optimize.RuntimeChunkPlugin({
    name: "manifest"
  }),
  //new ExtractTextPlugin("styles.css"),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(nodeEnv)
    }
  })
]
let _com = ['manifest', 'vendor', 'styles']
let entry = {}
let files = fs.readdirSync('./src/pages')
for (let i in files) {
  let key = files[i].split('.')[0]
  entry[key] = './src/pages/' + files[i]
  plugins.unshift(
    new HtmlWebpackPlugin({
      filename: key + '.html',
      template: './index.html',
      chunks: _com.concat(key)
    })
  )
}

let devServer = {}
let publicPath = './'
if (isPro) {
  plugins.unshift(
    new CleanWebpackPlugin(['dist']),
  )
} else {
  publicPath = 'http://localhost:80/dist/'
  plugins.push(
    new OpenBrowserPlugin({
      url: publicPath + '#/'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

module.exports = {
  mode: nodeEnv,
  entry: entry,
  output: {
    filename: pre_fix + '.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath,
    chunkFilename: pre_fix + '.js'
  },
  plugins,
  // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src')
    ],
    alias: {
      'templates': 'templates',
      'components': 'components',
      'css': 'assets/css',
      'js': 'assets/js',
      'images': 'assets/images',
      'vue$': 'vue/dist/vue.js',
      'routes': 'routes'
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(scss|css)$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './'
          }
        },
        {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          // options: {
          //   plugins: [
          //     require("autoprefixer")({
          //       browsers: ['last 2 versions']
          //     }) /*在这里添加*/
          //   ]
          // }
        },
        {
          loader: "sass-loader"
        }
      ]
      //use: ['style-loader', 'css-loader',"postcss-loader", 'sass-loader']
      // use: ExtractTextPlugin.extract({
      //   fallback: "style-loader",
      //   use: ['css-loader',"postcss-loader", 'sass-loader']
      // })
    }, {
      test: /\.(png|jpg|gif|md)$/,
      use: ['file-loader?limit=2048&name=images/[name].[ext]']
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=10000&mimetype=image/svg+xml']
    }],
  }
};
//"dev": "set NODE_ENV=development&& webpack-dev-server --config webpack.config.js --port 80",
