const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "public"),
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [/node_modules/],
            },
        ],
    },
};
