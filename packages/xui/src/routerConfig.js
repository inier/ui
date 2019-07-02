/** src/routerConfig.js */
import { DemoRouteConfig } from '@components';
import { Entrance, List, Doc, About } from '@pages';

const tUIRouters = DemoRouteConfig.map((item) => ({
    path: item.path,
    title: item.title,
    component: item.component,
}));

// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 检测关键字，请不要修改名称
const routerConfig = [
    {
        path: '/home',
        title: '首页',
        component: Entrance,
    },
    {
        path: '/list',
        title: '组件库',
        component: List,
    },
    {
        path: '/doc',
        title: '文档',
        component: Doc,
    },
    {
        path: '/about',
        title: '关于',
        component: About,
    },
    ...tUIRouters,
];

export default routerConfig;
