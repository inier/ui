// 通过 mode 接口拿到 src/components 下的所有文件夹名作为打包后的模块
const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '../');
const componentDir = 'src/components';
const cModuleNames = fs.readdirSync(path.resolve(componentDir)).filter((name) => {
    return !/\.[^\.]+$/.test(name);
});
console.log('======== 打包的组件列表 ========');
const cModuleMap = cModuleNames.reduce((prev, name) => {
    console.log(name);
    prev[name] = path.join(rootDir, `${componentDir}/${name}/index.js`);

    return prev;
}, {});

module.exports = cModuleMap;
