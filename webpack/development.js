const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./common");
const { merge } = require("webpack-merge");
const { sass, css } = require('./options');

const development = {
    mode: "development",
    devServer: {
        static: {
            directory: ""
        },
        host: "http://localhost/",
        port: 8080,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: css.dev },
                    { loader: "sass-loader", options: sass }
                ],
                exclude: /\.module\.(s[ac]ss|css)$/
            },
            {
                test: /\.module\.s[ac]ss$/,
                use: [
                    "style-loader",                    
                    { loader: "css-loader", options: css.module.dev },
                    { loader: "sass-loader", options: sass }
                ]
            },          
            {
                test: /\.module\.css$/,
                use: [
                    "style-loader",                    
                    { loader: "css-loader", options: css.module.dev }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: css.dev },
                ]                
            }
        ]
    }
}

module.exports = merge(common, development);