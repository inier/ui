/*
 * 定义 js 的打包
 */
import pkg from '../package.json';
// 模块引用
import commonJs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
// 用于分析构建后的代码
import visualizer from 'rollup-plugin-visualizer';
// 清理文件
import clear from 'rollup-plugin-clear';
import basePlugin from './rollupBasePluginConfig';

const createModuleConfig = (cModuleMap, external, isDev) => {
  console.log('======== 打包Module ========');
  return {
    // 入口 可以是一个字符串，也可以是对象
    input: {
      index: 'src/index.js',
      ...cModuleMap
    },
    // 出口
    output: [
      {
        dir: 'dist', // 可以是 dir 表示输出目录 也可以是 file 表示输出文件
        format: 'cjs', // 输出的格式 可以是 cjs commonJs 规范 | es es Module 规范 | iife 浏览器可引入的规范
        sourceMap: true,
        entryFileNames: '[name]/index.js',
        exports: 'named'
      },
      {
        dir: 'es', // 可以是 dir 表示输出目录 也可以是 file 表示输出文件
        format: 'es', // 输出的格式 可以是 cjs commonJs 规范 | es es Module 规范 | iife 浏览器可引入的规范
        sourceMap: true,
        entryFileNames: '[name]/index.js',
        exports: 'named'
      }
    ],
    // 是否开启代码分割
    experimentalCodeSplitting: true, //开启 rollup code-splitting
    // 需要引入的插件
    plugins: [
      clear({
        targets: ['dist', 'es']
      }),
      postcss({
        // modules: true, // 增加 css-module 功能
        extensions: ['.css', '.scss', '.sass', '.less', '.styl'],
        inject: isDev, // dev 环境下的 样式是注入到 js 中的，其他环境不会注入
        extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
      }),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        externalHelpers: true
      }),
      commonJs({
        exclude: ['src/**'],
        include: ['node_modules/**'],
        sourceMap: false
      }),
      // !isDev && terser(),
      process.env.npm_config_report &&
        visualizer({
          title: `${pkg.name} - ${pkg.author.name}`,
          filename: 'bundle-analyzer-report.html'
        }),
      ...basePlugin
    ],
    // 将模块视为外部模块，不会打包在库中
    external: (id) => external.some((e) => id.indexOf(e) === 0),
    globals: {
      react: 'React'
    },
    ...(isDev
      ? {
          // 文件监听
          watch: {
            include: 'src/**',
            clearScreen: true
          }
        }
      : {})
  };
};

export default createModuleConfig;
