const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require("../../../../webpack/development");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;


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
        filename: "[name].js",
        path: publicFolder,
        clean: true,
    },
    entry: {
        themes: {
            import: entry
        }
    },
    devServer: {
        host: "127.0.0.1",
        static: {
            publicPath,        
            directory: assets
        },        
        port: 8084
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
                  name: 'themes', // The name configured in ModuleFederationPlugin
                  exposes: { // The exposes configured in ModuleFederationPlugin
                    './': './src/index.ts',
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
            title: "Themes",
            filename: "index.html",
            chunks: ["themes"],
            inject: true
        }),
        new ModuleFederationPlugin({
            name: "themes",
            filename: "remoteEntry.js",
            exposes: {
                './': './src/index.ts',
            },
            remotes: {
                "core": "core@http://localhost:8000/remoteEntry.js"
            }
        }),
        new WebpackRemoteTypesPlugin({
            remotes: {
              core: 'core@http://localhost:8000/',
            },
            outputDir: '@types',
            remoteFileName: '[name]-dts.tgz' // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
        })
    ]
}

module.exports = merge(common, development);