var webpack = require('webpack');
var path = require("path");

module.exports = {
    // configuration
    entry: "./src/js/main.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
};