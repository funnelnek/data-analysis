const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require("../../../../webpack/development");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin');


const cwd = __dirname;
const src = path.resolve(cwd, "../src");
const publicFolder = path.resolve(cwd, "../dist");
const entry = path.resolve(src, "index.ts");
const template = path.resolve(src, "index.html");
const assets = path.resolve(publicFolder, "assets");
const host = "http://localhost/";
const publicPath = host + "assets/";

const development = {
    mode: "development",
    output: {
        filename: assets + "/js/[name].js",
        path: publicFolder,
        clean: true,
    },
    entry: {
        dashboard: {
            import: entry
        }
    },
    devServer: {
        host: "127.0.0.1",
        static: {
            publicPath,        
            directory: assets
        },        
        port: 8081
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'dts-loader',
                options: {
                  name: 'dashboard', // The name configured in ModuleFederationPlugin
                  exposes: { // The exposes configured in ModuleFederationPlugin
                    './dashboard': './src/index.ts',
                  },
                  typesOutputDir: '.federation' // Optional, default is '.wp_federation'
                },
              },
            ],
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template,
            title: "Dashboard",
            filename: "index.html",
            chunks: ["dashboard"],
            inject: true
        }),
        new ModuleFederationPlugin({
            name: "dashboard",
            filename: "remoteEntry.js",
            library: { type: "module", name: "@funnelnek/dashboard" },
            exposes: {
                './': './src/index.ts',
            },
            remotes: {
                "themes": "themes@http://localhost:8081/remoteEntry.js"
            }
        }),
        new WebpackRemoteTypesPlugin({
            remotes: {
              themes: 'themes@http://localhost:8081/',
            },
            outputDir: '@types',
            remoteFileName: '[name]-dts.tgz' // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
        })
    ]
}

module.exports = merge(common, development);