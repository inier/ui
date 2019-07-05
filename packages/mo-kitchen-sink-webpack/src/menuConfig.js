// 菜单配置
// headerMenuConfig：头部导航配置
export const headerMenuConfig = [
    {
        name: '反馈',
        path: 'https://github.com/alibaba/ice',
        external: true,
        newWindow: true,
        icon: 'message',
    },
    {
        name: '帮助',
        path: 'https://alibaba.github.io/ice',
        external: true,
        newWindow: true,
        icon: 'bangzhu',
    },
    {
        name: '退出',
        path: '/user/login',
        icon: 'yonghu',
    },
];

// asideMenuConfig：侧边导航配置
export const asideMenuConfig = [
    {
        name: '首页',
        path: '/home',
        icon: 'home',
    },
    {
        name: '组件',
        path: '/list',
        icon: 'shopcar',
    },
    {
        name: '文档',
        path: '/doc',
        icon: 'doc',
    },
    {
        name: '关于',
        path: '/about',
        icon: 'about',
    },
];

// footerMenuConfig：底部导航配置
export const footerMenuConfig = [
    {
        name: '首页',
        path: '/home',
        icon: 'home',
    },
    {
        name: '组件',
        path: '/list',
        icon: 'component',
    },
    {
        name: '文档',
        path: '/doc',
        icon: 'doc',
    },
    {
        name: '关于',
        path: '/about',
        icon: 'about',
    },
];

export default { footerMenuConfig, headerMenuConfig, asideMenuConfig };
