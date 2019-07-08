import { lazy } from '../../../LazyLoader';
// import { lazy } from '@components';
import UIRouterConfig from './UIRouterConfig.js';

// 组件基础类型列表
const typeList = [
    {
        type: 'basis',
        title: '基础',
        list: [],
    },
    {
        type: 'block',
        title: '块',
        list: [],
    },
    {
        type: 'layout',
        title: '布局',
        list: [],
    },
    {
        type: 'module',
        title: '模组',
        list: [],
    },
    {
        type: 'template',
        title: '模板',
        list: [],
    },
];

// RouteConfig
export const RouteConfig = UIRouterConfig.map((item) => {
    const tId = item.id;
    /* eslint-disable no-param-reassign */
    item.path = `/demo/${tId.toLowerCase()}`;
    return {
        path: item.path,
        title: item.title,
        component: lazy(() => import(`./pages/${tId}`)),
    };
});

// 列表转换
UIRouterConfig.forEach((component) => {
    const tType = component.type;
    typeList.forEach((type) => {
        if (type.type === tType) {
            const { id, path, title } = component;
            type.list.push(Object.assign({}, { id, path, title }));
        }
    });
});

export default typeList;
