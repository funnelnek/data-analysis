const path = require('path');
const { merge } = require('webpack-merge');
const common = require("../../../../../webpack/production");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


const cwd = __dirname;
const src = path.resolve(cwd, "src");
const publicFolder = path.resolve(cwd, "lib");
const entryFile = path.resolve(src, "index.ts");
const filename = "core.bundle.js";
const types = path.resolve(cwd, '@types');


const development = {
    context: cwd,
    mode: "development",
    output: {
        filename,
        path: publicFolder,
        clean: true,
        library: {
          name: "core",
          type: 'commonjs'
        }
    },
    entry: entryFile,
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'dts-loader',
                options: {
                  name: 'core', // The name configured in ModuleFederationPlugin
                  exposes: { // The exposes configured in ModuleFederationPlugin
                    './': './src/index.ts',
                  },
                  typesOutputDir: types // Optional, default is '.wp_federation'
                },
              },
            ],
          },
        ],
    },
    plugins: [       
        new ModuleFederationPlugin({
            name: "core",
            filename: 'remoteEntry.js',
            exposes: {
                './': './src/index.ts',
            }
        })
    ]
}

const config = merge(common, development);
module.exports = config;