const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry : './src/client/js/index.js',
    mode: 'production',
//    stats : 'verbose',
    target : 'node',
    output :{
        path : path.resolve(__dirname,'dist'),
        filename : '[name].bundle.js',
        libraryTarget : 'var',
        library : 'client'
        
    },
    module :{
        rules: [
            {
                test:  /\.scss$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
            },
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader : "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[hash].[ext]',
                      /*
                      publicPath: 'assets',
                      outputPath: 'assets/img',
                      */
                      esModule: false
                    }
                  }
                ]
            }
        ]
    },

    plugins : [
        new HtmlWebpackPlugin({
            template : './src/client/views/index.html',
            filename :'index.html'
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW()

    ],
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
}