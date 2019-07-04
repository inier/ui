// 通过 mode 接口拿到 src/components 下的所有文件夹名作为打包后的模块
const fs = require('fs');
const path = require('path');

const componentDir = 'src/components';
const cModuleNames = fs.readdirSync(path.resolve(componentDir)).filter((name) => {
  return !/\.[^\.]+$/.test(name);
});
console.log('=========================');
const cModuleMap = cModuleNames.reduce((prev, name) => {
  console.log(name);
  prev[name] = `${componentDir}/${name}/index.js`;
  return prev;
}, {});
console.log('=========================');

export default cModuleMap;
