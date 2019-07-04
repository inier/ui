// 公共插件
import globals from 'rollup-plugin-node-globals';
// import replace from 'rollup-plugin-replace';
import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import svg from 'rollup-plugin-react-svg';
import json from 'rollup-plugin-json';
import userAlias from './aliasConfig';
console.log(userAlias);
const BasePluginConfig = [
  json(),
  globals(),
  resolve(),
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
