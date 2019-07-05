/**
 * 定义应用路由
 */
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import shortid from 'shortid';
import routerConfig from './routerConfig';

/**
 * 根据菜单取得子级路由（children）的默认重定向地址并生产Route节点，嵌套路由默认重定向到当前菜单的第一个路由
 * @param {Array} menuConfig 路由配置
 * @returns {Array} 扁平化处理后的路由数组
 */
const getRedirectRoutes = (menuConfig) => {
    const redirectData = [];
    const getRedirect = (item) => {
        if (item && item.children) {
            if (item.children[0] && item.children[0].path) {
                redirectData.push({
                    from: `${item.path}`,
                    to: `${item.children[0].path}`,
                });
                item.children.forEach((children) => {
                    getRedirect(children);
                });
            }
        }
    };

    menuConfig.forEach(getRedirect);

    return redirectData.map((item) => {
        return <Redirect key={shortid.generate()} exact from={item.from} to={item.to} />;
    });
};

/**
 * 将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 * @returns {Array} 扁平化处理后的路由数组
 */
function recursiveRouterConfigV4(config = []) {
    const routeMap = [];
    config.forEach((item) => {
        const route = {
            path: item.path,
            layout: item.layout,
            component: item.component,
            title: item.title,
        };
        if (Array.isArray(item.children)) {
            route.childRoutes = recursiveRouterConfigV4(item.children);
        }
        routeMap.push(route);
    });
    return routeMap;
}

/**
 * 将扁平化后的路由信息生成 Route 节点
 *
 * @param {Element} container 路由容器
 * @param {object} router 路由对象
 * @param {string} contextPath 上层路由地址
 * @return {Route}
 * @example
 * <Switch>
 *   <Route exact path="/" component={Home} />
 *   <Route exact path="/page3" component={Page3} />
 *   <Route exact path="/page4" component={Page4} />
 *   <Route exact path="/page3/:id" component={Page3} />
 *   <Route exact component={NotFound} />
 * </Switch>
 */
function renderRouterConfigV4(container, router, contextPath) {
    const routeChildren = [];
    const renderRoute = (routeContainer, routeItem, routeContextPath) => {
        let routePath;
        if (!routeItem.path) {
            // eslint-disable-next-line
            console.error('route must has `path`');
        } else if (routeItem.path === '/' || routeItem.path === '*') {
            routePath = routeItem.path;
        } else {
            routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/');
        }

        // 优先使用当前定义的 layout
        if (routeItem.layout && routeItem.component) {
            routeChildren.push(
                <Route
                    key={routePath}
                    exact
                    path={routePath}
                    render={(props) => {
                        const tProps = { ...props };
                        tProps.title = routeItem.title || '默认title';
                        return React.createElement(
                            routeItem.layout,
                            tProps,
                            React.createElement(routeItem.component, tProps)
                        );
                    }}
                />
            );
        } else if (routeContainer && routeItem.component) {
            // 使用上层节点作为 container
            routeChildren.push(
                <Route
                    key={routePath}
                    exact
                    path={routePath}
                    render={(props) => {
                        const tProps = { ...props };
                        tProps.title = routeItem.title || '默认title';
                        return React.createElement(
                            routeContainer,
                            tProps,
                            React.createElement(routeItem.component, tProps)
                        );
                    }}
                />
            );
        } else {
            routeChildren.push(<Route key={routePath} exact path={routePath} component={routeItem.component} />);
        }

        // 存在子路由，递归当前路径，并添加到路由中
        if (Array.isArray(routeItem.childRoutes)) {
            routeItem.childRoutes.forEach((r) => {
                // 递归传递当前 route.component 作为子节点的 container
                renderRoute(routeItem.component, r, routePath);
            });
        }
    };

    router.forEach((r) => {
        renderRoute(container, r, contextPath);
    });

    return <Switch>{routeChildren}</Switch>;
}

const routerWithReactRouter4 = recursiveRouterConfigV4(routerConfig);
const routeChildren = renderRouterConfigV4(null, routerWithReactRouter4, '/');

export default <Router>{routeChildren}</Router>;
