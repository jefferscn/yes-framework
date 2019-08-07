import startDevServer from './devserver';
import path from 'path';
import webpackConfig from '../config/webpack.config.designer';
import uiWebpackConfig from '../config/webpack.config.designer.ui';

startDevServer(3001, path.resolve(__dirname, '../src'), webpackConfig, uiWebpackConfig);
