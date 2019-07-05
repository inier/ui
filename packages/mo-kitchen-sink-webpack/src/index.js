// 低版本浏览器兼容
// import './polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ErrorBoundary } from '@components';
import * as serviceWorker from './serviceWorker';
import './index.scss';

// 方式1：手工引入，适合简单项目
// import App from './App';

// 方式2：routerConfig配置方式，适合复杂项目
import router from './router';

const App = () => {
    return <ErrorBoundary>{router}</ErrorBoundary>;
};

render(<App />, document.getElementById('root'));

// 热加载，局部刷新
if (process.env.REACT_APP_HMR && module.hot) {
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
