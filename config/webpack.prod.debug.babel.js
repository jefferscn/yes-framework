import path from 'path';
import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import CompressionPlugin from 'compression-webpack-plugin';
// import baseConfig from './webpack.base.babel';
import baseConfig from './webpack.config';

// const { optimize, ContextReplacementPlugin } = webpack;
// const { CommonsChunkPlugin } = optimize;
// const { CommonsChunkPlugin } = optimize;
export default baseConfig(true, './build');
// export default baseConfig({
//     entry: [
//         'whatwg-fetch',
//         '@babel/polyfill',
//         './main',
//     ],
//     // Utilize long-term caching by adding content content hashes to compiled assets
//     output: {
//         // publicPath: '/yigo/webapp/',
//         filename: '[name].js',
//     },
//     plugins: [new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"', __DEV__: false}),
//         new ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-\S{2}|en-\S{2}/),
//         // new CommonsChunkPlugin({
//         //     name: 'vendor',
//         //     children: true,
//         //     minChunks: 2,
//         //     async: true,
//         // }),
//         new HtmlWebpackPlugin({
//             template: './index.html',
//             inject: true,
//         })
//     ],
//     performance: {
//         assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
//     },
// });
