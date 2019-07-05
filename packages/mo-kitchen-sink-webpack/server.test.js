const express = require('express');
const compression = require('compression');
const useragent = require('express-useragent');
const path = require('path');
const app = express();

app.use('/', (req, res, next) => {
    console.log(`Receive URL: ${req.path} `);
    next();
});

/**
 * 测试服务器代理配置
 */
// const proxy = require('http-proxy-middleware');

// //context可以是单个字符串，也可以是多个字符串数组
// const context = ['/'];
// //options可选的配置参数请自行看readme.md文档
// //，通常只需要配置target，也就是你的api所属的域名
// const options = {
//     target: '/',
//     pathRewrite:{
//       '^/app':''
//     },
//     changeOrigin: true
// }
// //将options对象用proxy封装起来，作为参数传递
// const apiProxy = proxy(options);
// //在测试环境的时候可以不用代理
// app.use(context, apiProxy)

// 启用gzip
app.use(compression());

// 添加useragent
app.use(useragent.express());

// 处理IE浏览器兼容
app.get('/*', (req, res, next) => {
    //console.log(req.useragent);
    const { browser, version } = req.useragent;
    if (browser === 'IE' && Number(version) <= 11) {
        res.sendFile(path.join(__dirname, 'build', 'ie.html'));
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
    console.log('Running at http://localhost:3001');
});
