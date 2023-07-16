const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./common");
const { merge } = require("webpack-merge");

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
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader" }
                ],
                exclude: /\.module\.(s[ac]ss|css)$/
            },
            {
                test: /\.module\.(s[ac]ss|css)$/,
                use: [
                    "style-loader",                    
                    { loader: "css-loader", options: { 
                        modules: {
                            mode: "local",
                            auto: true,
                            localIdentName: "[local]_[hash:base64]",
                            exportLocalsConvention: "camelCase"
                        }, sourceMap: true 
                    }},
                    { loader: "sass-loader" }
                ]
            },          
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: { sourceMap: true }},
                ]                
            }
        ]
    }
}

module.exports = merge(common, development);