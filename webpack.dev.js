const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  stats: "verbose",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/service-worker.js", to: "service-worker.js" }],
    }),
  ],
  mode: "development", // Set Webpack to development mode
  devServer: {
    static: path.join(__dirname, "dist"), // Serve content from the 'dist' directory
    compress: true, // Enable gzip compression
    port: 8080, // Port number for Webpack Dev Server
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};
