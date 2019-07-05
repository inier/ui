// Migrating from create-react-app without ejecting

// https://github.com/timarney/react-app-rewired/
// https://github.com/arackaf/customize-cra
const {
    override,
    addBabelPlugin,
    addBabelPlugins,
    addBundleVisualizer,
    addDecoratorsLegacy,
    addWebpackAlias,
    adjustWorkbox,
    addPostcssPlugins,
    disableEsLint,
    enableEslintTypescript,
    fixBabelImports,
    useEslintRc,
    useBabelRc,
} = require('customize-cra');

// 自定义配置
const {
    webpackAlias,
    rewireReactHotLoader,
    addStylelint,
    minimizer,
    extractVendors,
    namedOptimize,
    optimizeLodash,
    buildFriendly,
    prerender,
} = require('./config');

// https://github.com/postcss/postcss
const postcssPlugins = [
    // 合并重复项
    require('css-mqpacker')(),
];
console.log('当前环境：', process.env.NODE_ENV);
const { BUNDLE_VISUALIZE, STYLELINT } = process.env;

module.exports = override(
    buildFriendly(),
    STYLELINT && addStylelint(),
    useEslintRc(),
    useBabelRc(),
    addWebpackAlias(webpackAlias),
    addPostcssPlugins(postcssPlugins),
    minimizer(),
    optimizeLodash(),
    namedOptimize(),
    extractVendors(),
    BUNDLE_VISUALIZE && addBundleVisualizer()
    // prerender(),
);
