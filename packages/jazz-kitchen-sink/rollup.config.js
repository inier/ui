import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import sass from 'rollup-plugin-sass';
import svg from 'rollup-plugin-react-svg';
import { writeFileSync } from 'fs';
import path from 'path';

const external = ['react', 'prop-types'];
const outputTypes = [
  { file: './dist/es/index.js', format: 'es' } // ES Modules
];

const tasks = outputTypes.map((output) => ({
  input: {
    index: 'src/index.js', // 组件库主入口，相对路径
    ...cModuleMap // 各组件入口
  },
  external,
  output,
  name: 'my-library',
  plugins: [
    resolve(),
    filesize(),
    sass({
      output: (styles) => writeFileSync(path.resolve('./dist', 'index.css'), styles),
      options: {
        importer(url) {
          return (
            url.startsWith('~') && {
              file: `${process.cwd()}/node_modules/${url.slice(1)}`
            }
          );
        }
      }
    }),
    babel({
      exclude: 'node_modules/**', // 只编译源代码
      runtimeHelpers: true
    }),
    svg()
  ]
}));

export default tasks;
