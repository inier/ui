import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NotFound } from '@pages';

/**
 * 渲染路由组件
 * @param {Object} item routerConfig中的子项
 * @param {Number} index 索引
 * @returns {*} Route节点
 */
const renderNormalRoute = (item, index) => {
    // return item.component ? <Route key={index} path={item.path} component={item.component} exact={item.exact} /> : null;
    return item.component ? (
        <Route
            key={index}
            path={item.path}
            render={(props) => {
                document.title = item.title;
                return <item.component title={item.title} {...props} />;
            }}
            exact={item.exact}
        />
    ) : null;
};

const mainRoutes = (routerData) => {
    return (
        <Switch>
            {/* 渲染路由表 */}
            {routerData.map(renderNormalRoute)}

            {/* 根路由默认重定向 */}
            <Redirect from="/" to="/home" exact />

            {/* 未匹配到的路由重定向到 NotFound */}
            <Route component={NotFound} />
        </Switch>
    );
};

export default mainRoutes;
