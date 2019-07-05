/*
 * 定义 js 的打包
 */
import commonJs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import clear from 'rollup-plugin-clear';
import basePlugin from './rollupBasePluginConfig';

const createModuleConfig = (cModuleMap, external, isDev) => ({
  // 入口 可以是一个字符串，也可以是对象
  input: {
    index: 'src/index.js',
    ...cModuleMap
  },
  // 出口
  output: {
    dir: 'es', // 可以是 dir 表示输出目录 也可以是 file 表示输出文件
    format: 'es', // 输出的格式 可以是 cjs commonJs 规范 | es es Module 规范 | iife 浏览器可引入的规范
    sourceMap: true,
    entryFileNames: '[name]/index.js',
    exports: 'named'
  },
  // 是否开启代码分割
  experimentalCodeSplitting: true, //开启 rollup code-splitting
  // 需要引入的插件
  plugins: [
    clear({
      targets: ['es']
    }),
    postcss({
      // modules: true, // 增加 css-module 功能
      extensions: ['.css', '.scss', '.sass', '.less', '.styl'],
      // use: [
      //   [
      //     'less',
      //     {
      //       javascriptEnabled: true
      //     }
      //   ]
      // ],
      inject: isDev, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
      extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
    }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react']
    }),
    commonJs({
      exclude: 'src/**',
      include: 'node_modules/**',
      sourceMap: false
    }),
    // uglify(),
    ...basePlugin
  ],
  // 将模块视为外部模块，不会打包在库中
  external: (id) => external.some((e) => id.indexOf(e) === 0),
  ...(isDev
    ? {
        // 文件监听
        watch: {
          include: 'src/**',
          clearScreen: true
        }
      }
    : {})
});

export default createModuleConfig;
