const path = require("path");
// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
const root = process.cwd();

const rootJoin = (inRootPath) => {
  return path.join(root, inRootPath);
};

module.exports = {
  //context: sourcePath,
  entry: rootJoin(`./src/index.tsx`),
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".less", ".css"],
    //建立别名
    alias: {
      "@assets": rootJoin(`./src/assets`),
      "@views": rootJoin(`./src/views`),
      "@commonModules": rootJoin(`./src/commonModules`),
      // "@globalComponents": rootJoin(`./src/globalComponents`),
      // "@mock": rootJoin(`./mock`),
      "@scripts": rootJoin(`./build/scripts`),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: "babel-loader?cacheDirectory=true", // 使用cache提升编译速度
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: false }],
            ["import", { libraryName: "antd", style: "css" }],
            ["@babel/syntax-dynamic-import"],
            ["babel-plugin-precise-arithmetic"],
          ],
        },
        include: [
          rootJoin("./src"),
          rootJoin("./node_modules/webpack-dev-server/client"),
        ],
        exclude: /node_modules/,
      },
      //.css后缀文件
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(a?png|jpe?g|gif|svg)$/,
        use: "url-loader?limit=10240",
      },
      {
        test: /\.(bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    //主页面
    new HtmlWebpackPlugin({
      template: rootJoin(`./src/index.tmpl.ejs`),
      filename: `index.html`,
      inject: "body",
      publicPath: '/merchant/',
      minify: {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false, //删除空白符与换行符
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: rootJoin("./src/config.js"),
          to: path.join(root, "./dist"),
        },
      ],
    }),
  ],
};
