const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');

module.exports = {
    entry : './src/client/js/index.js',
    mode: 'development',
    devtool: 'inline-source-map',
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
                use: ["style-loader","css-loader","sass-loader"]
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
                      //name: '[name].[hash].[ext]',
                      name: '[name].[ext]',
                      publicPath: 'assets/img/',
                      outputPath: 'assets/img/',
                      esModule: false,
                      emitFile:true
                    }
                  }
                ]
            }/*,
            {
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'url-loader',
                },
            },*/
        ]
    },

    plugins : [
        new HtmlWebpackPlugin({
            template : './src/client/views/index.html',
            filename :'index.html'
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })


    ],
    devServer : {
        port : 1234,
        contentBase: path.join(__dirname,'dist')
    }
}