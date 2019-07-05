/**
 * 定义应用路由
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BasicLayout, MainLayout } from '@layouts';

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
const router = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/demo" component={BasicLayout} />
                <Route path="/" component={MainLayout} />
            </Switch>
        </Router>
    );
};

export default router();
