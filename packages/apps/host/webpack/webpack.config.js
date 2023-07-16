const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require("../../../../webpack/development");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin');


const cwd = __dirname;
const src = path.resolve(cwd, "../src");
const publicFolder = path.resolve(cwd, "../public");
const entry = path.resolve(src, "index.ts");
const template = path.resolve(src, "index.html");
const assets = path.resolve(publicFolder, "assets");
const host = "http://localhost/";
const publicPath = host + "assets/";

const development = {
    mode: "development",
    output: {
        filename: "assets/js/[name].js",
        path: publicFolder,
        clean: true,
    },
    entry: {
        main: {
            import: entry
        }
    },
    devServer: {
        host: "127.0.0.1",
        static: {
            publicPath,        
            directory: assets
        },        
        port: 8080
    },    
    plugins: [
        new HtmlWebpackPlugin({
            template,
            title: "Funnelnek",
            filename: "index.html",
            chunks: ["main"],
            inject: true
        }),
        new ModuleFederationPlugin({
            name: "host",
            filename: "remoteEntry.js",
            library: { type: "module", name: "@funnelnek/host" },
            remotes: {
                "dashboard": "dashboard@http://localhost:8081/remoteEntry.js"
            }
        }),
        new WebpackRemoteTypesPlugin({
            remotes: {
              dashboard: 'dashboard@http://localhost:8081/',
            },
            outputDir: '@types',
            remoteFileName: '[name]-dts.tgz' // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
        })
    ]
}

module.exports = merge(common, development);