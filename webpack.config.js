const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (_, env) => {
    const srcPath = directory => path.join(__dirname, 'src', directory);

    const isProdMode = env.mode === 'production';
    const prodCfg = {
        minimize: true,
        minimizer: [new TerserPlugin()],
    };

    return {
        mode: isProdMode ? 'development' : 'production',
        devtool: 'source-map',
        entry: ['@babel/polyfill', srcPath('config/bundle.js')],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            libraryTarget: 'umd',
            publicPath: '/',
        },
        devServer: {
            historyApiFallback: true,
        },
        optimization: isProdMode ? prodCfg : {},
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /(\.css|\.scss)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer()],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: sass,
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|mp3|svg$)$/i,
                    loader: 'file-loader',
                },
            ],
        },
        plugins: [
            new HTMLWebpackPlugin({ template: './src/index.html' }),
            new MiniCssExtractPlugin({
                filename: 'bundle.css',
            }),
            new CleanWebpackPlugin(),
        ],
        node: {
            fs: 'empty',
        },
    };
};
