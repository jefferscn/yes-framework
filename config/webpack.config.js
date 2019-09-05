import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
export default (DEBUG, PATH, PORT = 3000) => {
    return ({
        resolve: {
            extensions: ['.web.js', '.js'],
            alias: {
                'react-native': 'react-native-web',
                'yes-platform': 'yes-web',
                'yes-designer': path.resolve(__dirname, '../designer'),
                'react-native-web/dist/exports/Modal': 'modal-enhanced-react-native-web',
                'yes-template-default': path.resolve(__dirname, '../src/template/default'),
                'yes-control-default': path.resolve(__dirname, '../src/controls/default'),
                yes: 'yes-intf',
            },
        },
        entry: {
            app: (/*DEBUG ? [`webpack-dev-server/client?http://localhost:${PORT}`] : */[]).concat([
                'whatwg-fetch',
                '@babel/polyfill',
                './main',
            ]),
            // initializationLoading: './initializationLoading',
        },
        output: {
            path: path.resolve(__dirname, `../${PATH}`, 'generated'),
            filename: '[name].js',
            // publicPath: './generated/',
        },
        cache: DEBUG,
        // For options, see http://webpack.github.io/docs/configuration.html#devtool
        devtool: DEBUG ? 'source-map' : false,
        module: {
            loaders: [
                // Load ES6/JSX
                {
                    test: /\.jsx?$/,
                    include: [
                        path.resolve(__dirname, '../node_modules/react-native-scrollable-tab-view/'),
                        path.resolve(__dirname, '../node_modules/react-native-material-ui/'),
                        path.resolve(__dirname, '../node_modules/react-native-actionsheet/'),
                        path.resolve(__dirname, '../node_modules/react-native-datepicker/'),
                        path.resolve(__dirname, '../node_modules/react-native-radio-buttons/'),
                        path.resolve(__dirname, '../node_modules/react-native-tableview-simple/'),
                        path.resolve(__dirname, '../node_modules/react-native-vector-icons/'),
                        path.resolve(__dirname, '../node_modules/react-native-tab-view/'),
                        path.resolve(__dirname, '../node_modules/react-native-root-siblings/'),
                        path.resolve(__dirname, '../node_modules/static-container/'),
                        path.resolve(__dirname, '../node_modules/react-native-safe-area-view/'),
                        path.resolve(__dirname, '../node_modules/@react-navigation/'),
                        path.resolve(__dirname, '../node_modules/react-navigation-tabs/'),
                        path.resolve(__dirname, '../node_modules/react-navigation-drawer/'),
                        path.resolve(__dirname, '../node_modules/react-native-web/'),
                        path.resolve(__dirname, '../node_modules/yes-intf/'),
                        path.resolve(__dirname, '../node_modules/yes-web/'),
                        path.resolve(__dirname, '../node_modules/react-intl/'),
                        path.resolve(__dirname, '../node_modules/webpack-dev-server/'),
                        path.resolve(__dirname, '../node_modules/react-native-gesture-handler'),
                        path.resolve(__dirname, '../node_modules/react-native-reanimated'),
                        path.resolve(__dirname, '../node_modules/react-native-screens'),
                        path.resolve(__dirname, '../node_modules/yg-echarts/'),
                        path.resolve(__dirname, '../src'),
                        path.resolve(__dirname, '../designer'),
                        path.resolve(__dirname, '../entry.js'),
                        path.resolve(__dirname, '../main.js'),
                    ],
                    exclude: [
                        // path.resolve(__dirname, '../js/lib/yes-web/src/platform/wechat/jweixin.js'),
                    ],
                    loader: 'babel-loader',
                    query: {
                        babelrc: false,
                        presets: [['@babel/preset-env', { "modules": "commonjs", }], '@babel/preset-react', '@babel/preset-flow'],
                        plugins: ['@babel/plugin-proposal-export-default-from',
                            ['@babel/plugin-proposal-decorators', { "legacy": true}],
                            ['@babel/plugin-proposal-class-properties', {
                                "loose": true
                            }],
                            'react-native-web',
                            '@babel/plugin-proposal-export-namespace-from']
                    },
                }, {
                    test: /\.scss$/,
                    loaders: [
                        'isomorphic-style-loader',
                        'css-loader',
                        // 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                // Load images
                { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
                { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
                { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
                { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
                {
                    test: /\.tpl/,
                    loader: 'html-loader',
                },
                // Load fonts
                { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    exclude: [/control\.json/],
                },
                {
                    test: /control\.json/,
                    loader: 'control-loader',
                },
                { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
                // {
                //     test: require.resolve('../js/lib/yes-web/src/platform/wechat/jweixin.js'),
                //     use: 'imports-loader?this=>window',
                // },

            ],
        },
        plugins: DEBUG
            ? [
                new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"', __DEV__: true, __VERSION__: '"debug"', __DESIGN__: false}),
                new HtmlWebpackPlugin({
                    template: './index.html',
                }),
            ]
            : [
                new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"', __DEV__: false, __VERSION__: '"debug"', __DESIGN__: false }),
                // new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    compressor: { screw_ie8: true, keep_fnames: true, warnings: false },
                    mangle: { screw_ie8: true, keep_fnames: true },
                }),
                // new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.AggressiveMergingPlugin(),
                new HtmlWebpackPlugin({
                    template: './index.html',
                    // chunksSortMode: 'manual',
                    // chunks: ['initializationLoading', 'vendor'],

                }),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: './reports.html',
                    openAnalyzer: true,
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    children: true,
                    // chunks: ['app'],
                    minChunks: ({ resource }) => (
                        resource &&
                        resource.indexOf('node_modules') >= 0 &&
                        resource.match(/\.js$/)
                    ),
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    // filename: 'used-twice.js',
                    async: 'used-twice',
                    children: true,
                    minChunks(module, count) {
                        return count >= 2;
                    },
                }),
                // new webpack.optimize.UglifyJsPlugin({
                //     sourceMap: true,
                //     compress: {
                //         warnings: false,
                //     },
                // }),
            ],
    });
};
