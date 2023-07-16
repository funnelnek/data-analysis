const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");


const projectDir = path.resolve(__dirname, "..");

const inProduction = process.env.NODE_ENV;

module.exports = {
    context: projectDir,
    output: {
        clean: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json"],
        plugins: [new TsconfigPathsPlugin()]
    },
    module: {
        rules: [
            {
                test: /(?<!\.d)\.tsx?$/,
                use: [
                    { loader: "babel-loader" },
                    { 
                        loader: "ts-loader", 
                        options: {                            
                            projectReferences: true
                        } 
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.d\.ts$/,
                use: "ignore-loader"
            },            
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.jsx?$/,
                use: [{ loader: "babel-loader" }]
            },                        
            {
                test: /\.(jpe?g|png|svg|gif)/,
                type: "asset/resource"
            }            
        ]
    }
}