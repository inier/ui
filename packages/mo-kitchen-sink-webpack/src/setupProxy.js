/** src/setupProxy.js */
const proxy = require('http-proxy-middleware');

// 开发环境代理配置
module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: 'http://localhost',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};
