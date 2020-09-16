const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "webpackFinal": (config) => {
    console.log(config);
    config.resolve.alias['core-js/modules'] = path.resolve(
      __dirname,
      '..',
      'node_modules/@storybook/core/node_modules/core-js/modules'
    );

    config.resolve.alias['react-native'] = 'react-native-web';
    config.resolve.alias['yes'] = 'yes-intf';
    config.resolve.alias['yes-framework'] = path.resolve(__dirname, '../src');
    config.resolve.alias['yes-platform'] = 'yes-web';
    config.resolve.alias['yes-yiui-common'] = 'yes-core/dist/YIUI-common';
                // 'yes-filtermap': 'yes-core/dist/filtermap',
    config.resolve.alias['yes-filtermap'] = 'yes-core/dist/filtermap';
    config.resolve.extensions = ['.web.js', ...config.resolve.extensions];
    config.module.rules.push({
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
        path.resolve(__dirname, '../node_modules/react-intl/'),
        path.resolve(__dirname, '../node_modules/webpack-dev-server/'),
        path.resolve(__dirname, '../node_modules/react-native-gesture-handler'),
        path.resolve(__dirname, '../node_modules/react-native-reanimated'),
        path.resolve(__dirname, '../node_modules/react-native-screens'),
        path.resolve(__dirname, '../node_modules/yes-comp-react-native-web'),
        path.resolve(__dirname, '../node_modules/react-wx-images-viewer'),
        path.resolve(__dirname, '../node_modules/yg-echarts/'),
        path.resolve(__dirname, '../node_modules/yes-core/'),
        path.resolve(__dirname, '../node_modules/react-navigation-is-focused-hoc/'),
        path.resolve(__dirname, '../node_modules/yes-intf/'),
        path.resolve(__dirname, '../node_modules/idb/'),
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../entry.js'),
        path.resolve(__dirname, '../main.js'),
      ],
      exclude: [
        // path.resolve(__dirname, '../js/lib/yes-web/src/platform/wechat/jweixin.js'),
      ],
      loader: 'babel-loader',
      query: {
        babelrc: false,
        presets: [['@babel/preset-env', { "modules": "commonjs" }], '@babel/preset-react', '@babel/preset-flow'],
        plugins: ['@babel/plugin-proposal-export-default-from',
          ['@babel/plugin-proposal-decorators', { "legacy": true }],
          ['@babel/plugin-proposal-class-properties', {
            "loose": true
          }],
          '@babel/plugin-proposal-export-namespace-from']
      },
    })
    return config;
  }
}