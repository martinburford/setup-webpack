// Global node imports
const path = require('path');

// NPM imports (specific to Webpack)
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname.replace('webpack',''), 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // Creates style nodes from JavaScript string
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader' // Compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            title: 'Martins template',
            template: path.resolve(__dirname, 'build-template.html')
        })
    ]
}