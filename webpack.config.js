var webpack = require('webpack');
var path = require("path");

module.exports = {
    // configuration
    entry: "./src/js/main.js",
    output: {
        filename:"[name].bundle.js",
        path: path.join(__dirname, "dist"),
        publicPath: "http://127.0.0.1:8000/"
    },
    watch: true,
    mode: 'development',
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ["env"]
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: ["url-loader"]
            }            
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            popper: "popper"            
        })
    ]
    // externals: {
    //         progressively: "progressively"
    // }
};