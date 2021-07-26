const path = require('path');
const root = process.cwd();
const outPathDev = path.join(root, `./dist`);
const killPort = require('kill-port');
const colors = require('colors');
const { execSync, exec } = require('child_process');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackDevDerverPort = 9898;

//if all requests need be proxy, pleae use "/"
const needMockApiList = ['/login','/register','/bizError','/error400','/error404','/error500','/error503'];

const rootJoin = (inRootPath) => {
    return path.join(root, inRootPath);
  };

//默认杀死端口7080
killPort(webpackDevDerverPort);

const dev = 'https://abq9gb.39nat.com'

module.exports = {
    //context: sourcePath,
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        chunkFilename:'[name].chunk.js',
        path:outPathDev,
    },
    devServer:{
        host: 'localhost', 
        port: webpackDevDerverPort,
        hot: true,
        inline: true,  //开启页面自动刷新  s
        compress: false,
        progress: false, //显示打包的进度
        historyApiFallback: {
            disableDotRule: true
        },
        stats: 'minimal',
        clientLogLevel: 'warning',
        proxy: {
            // '/user': {
            //     // target: cs,
            //     target: dev,
            //     changeOrigin: true
            // },
        }
    },
    plugins: [
      //主页面
      new HtmlWebpackPlugin({
        template: rootJoin(`./src/index.tmpl.html`),
        filename: `index.html`,
        inject: "body",
        minify: {
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: false, //删除空白符与换行符
        },
      }),
    ],
};

