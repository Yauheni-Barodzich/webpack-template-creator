const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require('path');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        })
    ],
    module: {
        rules: [
        {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
            test: /\.(png|jpg|jpeg)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.svg$/,
            type: 'asset/resource',
            generator: {
                filename: path.join('icons', '[name].[contenthash][ext]'),
            }
        }
        ],
    },
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
    },
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            ['svgo', { name: 'preset-default' }],
                        ],
                    },
                },
            }),
        ],
    },
};