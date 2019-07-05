// react-hot-loader
const rewireReactHotLoader = require('./rewireReactHotLoader');
// 增加stylelint
const addStylelint = require('./addStyleLint');
// 代码优化压缩: 在react-scripts 2.1.5的基础上增加了去除console的功能
const minimizer = require('./minimizer');
// 提取第三方库
const extractVendors = require('./extractVendors');
// moduleIds和chunkIds固化
const namedOptimize = require('./namedOptimize');
// 优化lodash打包
const optimizeLodash = require('./optimizeLodash');
// prerender SPA
const prerender = require('./prerender');
// 构建显示优化
const buildFriendly = require('./buildFriendly');
// webpack alias
const webpackAlias = require('./aliasConfig');

module.exports = {
    prerender,
    webpackAlias,
    rewireReactHotLoader,
    addStylelint,
    minimizer,
    extractVendors,
    namedOptimize,
    optimizeLodash,
    buildFriendly,
};
