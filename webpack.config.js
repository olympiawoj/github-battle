//1) deal with file system - path comes with node
//2 use common js to export an object which will be all our config settings for webpack

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  //1) define entry point of our application
  entry: "./app/index.js",
  //2) define the OUTPUT - where the bundle webpack creates is going to go, where to put the file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  //3 define the transforms
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.(css)$/, use: ["style-loader", "css-loader"] }
    ]
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html"
    }),
    new CopyPlugin([{ from: "_redirects" }])
  ],
  devServer: {
    historyApiFallback: true
  }
};
