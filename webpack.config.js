const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env) => {
    const plugins = [];
    if (env && env.prod) {
        plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        debug: false,
                        sourceMap: false,
                        beautify: false,
                        compress: {
                            ie8: true,
                            passes: 3
                        },
                        parse: {
                            // screw_ie8: true,
                            // sequences: true,  // join consecutive statemets with the “comma operator”
                            // properties: true,  // optimize property access: a["foo"] → a.foo
                            // dead_code: true,  // discard unreachable code
                            // drop_debugger: true,  // discard “debugger” statements
                            // unsafe: false, // some unsafe optimizations (see below)
                            // conditionals: true,  // optimize if-s and conditional expressions
                            // comparisons: true,  // optimize comparisons
                            // evaluate: true,  // evaluate constant expressions
                            // booleans: true,  // optimize boolean expressions
                            // loops: true,  // optimize loops
                            // unused: true,  // drop unused variables/functions
                            // hoist_funs: true,  // hoist function declarations
                            // hoist_vars: false, // hoist variable declarations
                            // if_return: true,  // optimize if-s followed by return/continue
                            // join_vars: true,  // join var declarations
                            // cascade: true,  // try to cascade `right` into `left` in sequences
                            // side_effects: true,  // drop side-effect-free statements
                            // warnings: false,
                        },
                        comments: false

                    }
                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production')
                    }
                })
        );
    }

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: []
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: []
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.join(__dirname, './src')
            ]
        },
        plugins: [
            new CopyWebpackPlugin([{from: './assets/', to: 'assets'}]),
            new HtmlWebpackPlugin({
                filename: 'index2.html',
                template:'./assets/index2.html',

            }),
            new HtmlWebpackPlugin({
                template:'./assets/index.html',
            })
        ],
        devServer: {
            historyApiFallback: true
        }
    };
};