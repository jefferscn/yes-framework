import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';
import baseConfig from './webpack.base.babel';

const { optimize, ContextReplacementPlugin } = webpack;
const { CommonsChunkPlugin } = optimize;
// const { CommonsChunkPlugin } = optimize;
export default baseConfig({
    entry: [
        'babel-polyfill',
        path.join(process.cwd(), './main.js'),
    ],
    // Utilize long-term caching by adding content content hashes to compiled assets
    output: {
        // publicPath: '/yigo/webapp/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },
    plugins: [new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"', __DEV__: false}),
        new ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-\S{2}|en-\S{2}/),
        new CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: 2,
            async: true,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,

        }),
        new CompressionPlugin({
            test: /\.js/,
        }),
    ],
    performance: {
        assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
    },
});
