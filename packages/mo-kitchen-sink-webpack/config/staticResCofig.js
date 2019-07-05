// 公共组件库静态资源处理
//https://www.npmjs.com/package/webpack-merge
var merge = require('webpack-merge');

const staticResCofig = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    // 方法1：所有图片都打包到组件代码中，不再单独提取出来
    console.log("config-module.rules:前：", config.module.rules);
    merge.smart(config.module.rules, [{
        test: /\.svg$/,
        use:[{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'static/imgs/[name].[ext]'
        },
      }]
    }];
    console.log("config-module.rules:前：", config.module.rules);

    // 方法2: 使用 copy-webpack-plugin 将组件库中的静态文件拷贝到项目中
    // https://github.com/webpack-contrib/copy-webpack-plugin
    const LodashModuleReplacementPlugin = require('copy-webpack-plugin');
    config.plugins.push(
        new CopyWebpackPlugin(
            [
                { from: '', to: 'dist/static' }, // 路径根据实际情况设置
            ],
            options
        )
    );

    return config;
};

module.exports = staticResCofig;
