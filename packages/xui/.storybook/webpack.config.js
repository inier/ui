const path = require('path');
// 自定义配置
const { webpackAlias } = require('../config');

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(j|t)sx?$/,
        use: [
            {
                loader: require.resolve('babel-loader'),
                exclude: path.join(__dirname, 'node_modules'),
                options: {
                    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
                },
            },
        ],
    });
    config.resolve.alias = webpackAlias;
    config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx');
    return config;
};
