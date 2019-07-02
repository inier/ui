/** src/routerConfig.js */
import { lazy } from '@components';
//import { BasicLayout, BlankLayout, MainLayout } from '@layouts';
import { Entrance, List, Doc, About } from '@pages';
import { UIRouters } from '@pages/List/UIRoutes.js';

const tUIRouters = UIRouters.map((item) => ({
    path: item.path,
    title: item.title,
    component: lazy(() => import(`@pages/List/pages/${item.id}.jsx`)),
    layout: 'BasicLayout',
}));

// 描述路由的协议格式
const routerConfig = [
    {
        path: '/home',
        title: '首页',
        component: Entrance,
        layout: 'MainLayout',
    },
    {
        path: '/list',
        title: '组件库',
        component: List,
        layout: 'MainLayout',
    },
    {
        path: '/doc',
        title: '文档',
        component: Doc,
        layout: 'MainLayout',
    },
    {
        path: '/about',
        title: '关于',
        component: About,
        layout: 'MainLayout',
    },
    ...tUIRouters,
];

export default routerConfig;
