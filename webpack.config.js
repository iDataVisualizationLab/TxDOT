require('dotenv').config();
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");
const { execSync } = require("child_process");
const webpack = require("webpack");
const commitHash = process.env.LOCAL_COMMIT_HASH || (() => {
  try {
    return execSync("git rev-parse HEAD").toString().trim();
  } catch (error) {
    return "unknown";
  }
})();
module.exports = {
  mode: "production",
  entry: {
    "bundle.js": glob.sync("build/static/?(js|css)/main.*.?(js|css)").map(f => path.resolve(__dirname, f)),
  },
  output: {
    filename: "build/static/js/bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /dist|design/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.LOCAL_COMMIT_HASH": JSON.stringify(commitHash)
    }),
  ],
};
