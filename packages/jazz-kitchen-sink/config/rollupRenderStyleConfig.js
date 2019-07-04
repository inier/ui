/*
 * 定义 style 的编译输出
 */

import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import clear from 'rollup-plugin-clear';
import basePlugin from './rollupBasePluginConfig';

const createStyleConfig = (moduleName, external) => ({
  input: `src/components/${moduleName}/index.js`,
  output: {
    file: `garbage/${moduleName}.js`,
    format: 'es'
  },
  plugins: [
    clear({
      targets: ['garbage']
    }),
    // css 处理，暂时没有加插件
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
      plugins: [autoprefixer, cssnano],
      // 样式输出到 createModuleConfig 创建的模块文件夹下
      extract: `es/${moduleName}/style/index.css`
    }),

    ...basePlugin
  ],
  external: (id) => external.some((e) => id.indexOf(e) === 0)
});

export default createStyleConfig;
