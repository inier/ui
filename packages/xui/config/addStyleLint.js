const resolve = require('./paths');
// stylelint-webpack-plugin
const addStylelint = () => (config) => {    
    // https://github.com/webpack-contrib/stylelint-webpack-plugin#readme
    const StyleLintPlugin = require('stylelint-webpack-plugin');
    config.plugins.push(
        new StyleLintPlugin({
            syntax: 'scss',
            configBasedir: resolve('.'),
            context: resolve('.'),
            files: ['**/*.{scss,sass,css}'],
            fix: true,
        })
    );
    console.log('--- stylelint ---');
    return config;
};

module.exports = addStylelint;
