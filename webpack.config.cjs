const TerserPlugin = require('terser-webpack-plugin');
const path = require('node:path');

module.exports = {
    entry: {
        core: path.resolve(__dirname, 'dist', 'index.js'),
    },
    output: {
        filename: '[name].web.js',
        path: path.resolve(__dirname, 'web'),
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                    mangle: false,
                },
                parallel: true,
            }),
        ],
    },
};
