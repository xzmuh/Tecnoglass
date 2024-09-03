const nodeExternals = require('webpack-node-externals');
const { resolve } = require('path');

const config = {
    mode: 'production',
    entry: './index.ts',
    target: 'node',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.html'],
        fallback: {
            fs: require.resolve('brfs'),
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            buffer: require.resolve('buffer/'),
            url: require.resolve('url/')
        }
    },
};

module.exports = config;
