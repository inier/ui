/** src/routerConfig.js */
import { lazy } from '@components';
import { BasicLayout, BlankLayout, MainLayout } from '@layouts';
import { Entrance, List, Doc, About, NotFound } from '@pages';
import { UIRouters } from '@pages/List/UIRoutes.js';

const tUIRouters = UIRouters.map((item) => ({
    path: item.path,
    title: item.title,
    component: lazy(() => import(`@pages/List/pages/${item.id}.jsx`)),
    layout: BasicLayout,
}));
// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
const routerConfig = [
    {
        path: '/home',
        title: '首页',
        component: Entrance,
        layout: MainLayout,
    },
    {
        path: '/list',
        title: '组件库',
        component: List,
        layout: MainLayout,
    },
    {
        path: '/doc',
        title: '文档',
        component: Doc,
        layout: MainLayout,
    },
    {
        path: '/about',
        title: '关于',
        component: About,
        layout: MainLayout,
    },
    ...tUIRouters,
    {
        path: '*',
        title: '404',
        component: NotFound,
        layout: BlankLayout,
    },
];

export default routerConfig;
