const webpack = require('webpack');
const path = require('path');

const __nodeModules = path.resolve(__dirname, "node_modules");
console.log(__nodeModules);
module.exports = {
    entry: {
        app: './src/main.ts'
    },
    devtool: 'source-map',
    target: 'node',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: '[file].map'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
};