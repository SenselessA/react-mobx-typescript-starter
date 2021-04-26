const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const PATHS = {
    build: path.join(__dirname, 'build'),
    dev: './dist'
};

const webpackConfig = (env, args) => {
    const isDevMode = args.mode === 'development';

    return {
        entry: './src/js/index',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        output: {
            path: PATHS.build,
            publicPath: 'auto',
            filename: 'main.js?[hash]',
        },
        devServer: {
            contentBase: PATHS.dev,
            port: 5000,
            historyApiFallback: true,
        },
        optimization: {
            minimize: !isDevMode
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader, {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                url: false,
                                modules: {
                                    localIdentName: isDevMode ? '[local]' : '[hash:base64:5]'
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: './static/icons/[name].[ext]'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.(woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[hash]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/js/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'static/[name].[hash].css',
            }),
            new CleanWebpackPlugin(),
            // new CopyWebpackPlugin({
            // 	patterns: [{
            // 		from: path.join('./src/static/icons'),
            // 		to: path.join(isDevMode ? '' : PATHS.build, 'static/icons'),
            // 	},
            // 	{
            // 		from: path.join('./src/static/fonts'),
            // 		to: path.join(isDevMode ? '' : PATHS.build, 'static/fonts')
            // 	}]
            // })
        ]
    };
};

module.exports = (env, args) => {
    const isDevMode = args.mode === 'development';

    require('dotenv').config({
        path: path.resolve(__dirname, isDevMode ? '.env.development' : '.env.production')
    });

    const config = webpackConfig(env, args);

    if (isDevMode) {
        config.devtool = 'source-map';
    }

    return config;
};