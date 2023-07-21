const common = require("./common");
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { sass, css } = require('./options');

const production = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "sass-loader", options: sass }
                ]
            },
            {
                test: /\.module\.(s[ac]ss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: css.module.prod },
                    { loader: "sass-loader", options: sass }
                ]
            },          
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};

const config = merge(common, production);
module.exports = config;