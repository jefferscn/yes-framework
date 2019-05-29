import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import methodOverride from 'method-override';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// import cors from 'cors';
import webpackConfig from '../config/webpack.config.designer';
import uiWebpackConfig from '../config/webpack.config.designer.ui';
import filetree from './routes/filetree';

const app = new express();
// app.use(cors());
var config = webpackConfig(true, 'build');
var uiConfig = uiWebpackConfig(true, 'build');
const compiler = webpack(config);
const uiCompiler = webpack(uiConfig);
// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: config.output.publicPath,
    index: 'index.html',
    // hot: true,
    // noInfo: true,
    stats: {
        colors: true,
    },
}));
app.use(webpackDevMiddleware(uiCompiler, {
    // public path should be the same with webpack config
    publicPath: uiConfig.output.publicPath,
    index: 'index.html',
    // hot: true,
    // noInfo: true,
    stats: {
        colors: true,
    },
}));

// app.use(webpackHotMiddleware(compiler));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.use('/file', filetree(path.resolve(__dirname, '../src')));
// app.use('/file', filetree('C:/Users/Administrator/workspace/yes-webapp/src/js/projects/thgn'));
app.listen(3001);

export default app;
