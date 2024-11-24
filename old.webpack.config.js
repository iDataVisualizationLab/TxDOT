
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");
const webpack = require("webpack");

const child_process = require("child_process");

function git(command) {
  return child_process.execSync(`git ${command}`, { encoding: "utf8" }).trim();
}

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
      "process.env.GIT_VERSION": JSON.stringify(git("describe --always")),
      "process.env.GIT_AUTHOR_DATE": JSON.stringify(git("log -1 --format=%aI")),
      "process.env.LOCAL_COMMIT_HASH": JSON.stringify(git("rev-parse HEAD")),
    }),
  ],
  
  
};
