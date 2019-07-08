// 打包相关配置
// https://blog.csdn.net/mjzhang1993/article/details/86712439
const resolve = require('./paths');

// 打包相关配置
const libPackConfig = () => (config) => {
    const pkg = require('../package.json');
    const cModuleMap = require('./obtainComponentsName');
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    const baseConfig = {
        entryFile: [resolve('src/components/index.scss'), resolve('src/components/index.js')],
        cModuleMap: cModuleMap,
        outputDir: resolve('dist'),
    };
    const tLibConfig = {
        // 入口处设置为多入口，即每一个组件都作为一个入口，这样输出的可以是拆分后的组件
        entry: {
            xui: baseConfig.entryFile,
            // ...baseConfig.cModuleMap, // 组件的名称及位置
        },
        output: {
            path: baseConfig.outputDir, // 要输出多文件这里就要配置输出目录而不是当个文件
            filename: '[name].min.js',
            // output.library 和 output.libraryTarget 一起使用 对外暴露 library 及定义输出组件库格式
            library: ['xui', '[name]'],
            libraryTarget: 'umd',
            publicPath: '/dist/',
        },
        /**
         * externals 的值可以是一个数组，数组的每一项都是一个函数，函数接收三个参数
         * 其中 request 是当前处理的 模块引用路径
         */
        externals: Object.keys(pkg.dependencies)
            .concat(['@components'])
            .map((pkgName) => (context, request, callback) => {
                // 逻辑：以模块名 pkgName 开始的引用都将视为外部模块
                request.indexOf(pkgName) === 0 ? callback(null, request) : callback();
            }),
        // .concat(
        //     Object.keys(baseConfig.cModuleMap).map((pkgName) => (context, request, callback) => {
        //         request.indexOf(`../${pkgName}`) === 0 ? callback(null, request) : callback();
        //     })
        // ),
    };

    Object.assign(config, tLibConfig);

    const { IS_PACK } = process.env;
    if (IS_PACK) {
        // 打包数据时关闭压缩
        config.optimization.minimize = false;
    }

    console.log('打包配置：', config);
    return config;
};

module.exports = libPackConfig;
