const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包时引入index.html
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除dist文件夹

const CopyWebpackPlugin = require('copy-webpack-plugin')
  // plugins: [    ......,    //该类型的构造函数要求出入一个数组: 用于指定需要拷贝的文件路径, 可以是一个通配符、目录、文件的相对路径    


module.exports={
  mode: 'development', // none,不压缩  production,压缩 , development,开发环境

  entry: path.resolve(__dirname,'./src/main.js'), // 入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件的路径

    filename: 'js/[name].js' // 输出文件的名称
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        loader: 'ts-loader',
        options:{
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        // 加载/提取js文件
        // vue-loader@next 
        test: /\.vue$/,
        use: [
          'vue-loader',
        ]
      },
      {
        // 加载/提取css文件  
        // style-loader
        // css-loader
        test: /\.css$/i,
        exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
          ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
       type: 'javascript/auto'
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'), // 指定模板文件
      filename: 'index.html', // 指定输出文件名
      title: '手搭vue开发环境' // 指定模板文件中的变量
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),

    // 静态文件资源打包
    new CopyWebpackPlugin({
      patterns: [{
        from: "./public", to: "./public/" 
      }]
    })  
  ],
  devServer: {
    static: './dist',
    port: 8080,
  },
  resolve: {
    extensions: ['.tsc', '.ts', '.js', '.vue', '.json'],
  }
  // devServer: {
  //   static: './dist', // 告诉服务器从哪里提供内容
  //   port: 3000, // 指定端口
  //   open: true, // 自动打开浏览器
  //   hot: true, // 开启热更新
  //   publicPath:"/" // 在开发环境中，配置这个参数，可以让服务器访问静态资源的路径
  // }
}
