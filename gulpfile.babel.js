import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import packageJson from './package.json';
import runSequence from 'run-sequence';
import rename from 'gulp-rename';
import webpack from 'webpack';
import webpackConfig from './config';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import minimist from 'minimist';
import compression from 'compression';

var knownOptions = {
    string: 'platform',
    default: { platform: 'web' },
};

var options = minimist(process.argv.slice(3), knownOptions);

const PORT = process.env.PORT || 80;
const $ = gulpLoadPlugins({ camelize: true });
const DEST_DIR = process.env.DEST_DIR || 'build';
$.util.log(options);

// Remove all built files
gulp.task('serve:clean', cb => del(DEST_DIR, { dot: true, force: true }, cb));
gulp.task('dist:clean', cb => del([DEST_DIR], { dot: true, force: true }, cb));


// Copy static files across to our final directory
gulp.task('serve:static', () =>
    gulp.src([
        'app/static/**',
    ])
        .pipe($.changed(DEST_DIR))
        .pipe(gulp.dest(DEST_DIR))
        .pipe($.size({ title: 'static' }))
);

gulp.task('dist:static', () =>
    gulp.src([
        'app/static/**',
    ])
        .pipe(gulp.dest(DEST_DIR))
        .pipe($.size({ title: 'static' }))
);

// Start a livereloading development server
gulp.task('serve:start', gulp.series('serve:static', () => {
    const config = webpackConfig[options.platform](true, DEST_DIR, PORT);
    return new WebpackDevServer(webpack(config), {
        // contentBase: './generated',
        contentBase: './',
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
    })
        .listen(PORT, '0.0.0.0', (err) => {
            if (err) throw new $.util.PluginError('webpack-dev-server', err);

            $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
        });
}));

// release，使用express，
gulp.task('serve:startRelease', gulp.series('serve:static', () => {
    const app = express();
    app.use(compression());
    app.use(express.static(`${DEST_DIR}/generated`));
    app.listen(PORT, (err) => {
        if (err) throw new $.util.PluginError('express server', err);
        $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
    });
}));

// Create a distributable package
gulp.task(`dist:${DEST_DIR}`, gulp.series('dist:static', cb => {
    const config = webpackConfig[options.platform](false, DEST_DIR);
    webpack(config, (err, stats) => {
        if (err) throw new $.util.PluginError(DEST_DIR, err);

        $.util.log(`[${packageJson.name} dist]`, stats.toString({ colors: true }));

        cb();
    });
}));

// Main tasks
gulp.task('serve', gulp.series('serve:clean', 'serve:start'));
gulp.task('dist', gulp.series('dist:clean', `dist:${DEST_DIR}`));
gulp.task('clean', gulp.series('dist:clean', 'serve:clean'));
gulp.task('startrelease', gulp.series('serve:clean', `dist:${DEST_DIR}`, 'serve:startRelease'));
