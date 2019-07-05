// 公共插件

import globals from 'rollup-plugin-node-globals';
// 字符串替换，类似 webpack 的 DefinePlugin
// import replace from 'rollup-plugin-replace';
import alias from 'rollup-plugin-alias';
// 模块引用
import resolve from 'rollup-plugin-node-resolve';
// 查看构建后的文件大小
import filesize from 'rollup-plugin-filesize';
import svg from 'rollup-plugin-react-svg';
import json from 'rollup-plugin-json';
import userAlias from './aliasConfig';
console.log(userAlias);
const BasePluginConfig = [
  json(),
  globals(),
  resolve({
    jsnext: true,
    browser: true,
    main: true
  }),
  //   replace({
  //     include: 'src/**', // 指定可以使用变量的文件路径
  //     exclude: 'node_modules/**',
  //     ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  //   }),
  alias({
    resolve: ['.jsx', '.js', '.tsx', '.ts', '.scss', '.sass'],
    ...userAlias
  }),
  filesize(),
  svg()
];

export default BasePluginConfig;
