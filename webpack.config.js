var path = require("path");

module.exports = {
    entry: "./main.jsx",
    output: {filename: "out.js", path: path.resolve(__dirname, "js")},
    devServer: {
        inline: true,
        contentBase: './',
        port: 3001
    },
    mode: "development", watch: true,
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        'es2015',
                        'stage-2',
                        'react'
                    ]
                }
            }
        }]
    }
};