import React from 'react';
import { withRouter } from 'react-router-dom';
import { BasePage, Header, PageContainer } from '@components';
// import BasicLayoutHoc from './BasicLayoutHoc';
import { getPageTitle } from '@utils';
import routerData from '@routerConfig';
import mainRoutes from './MainRoutes';

export default withRouter(({ location, history }) => {
    return (
        <BasePage>
            <Header title={getPageTitle(location, routerData)} onLeftClick={history.goBack} />
            <PageContainer>{mainRoutes(routerData)}</PageContainer>
        </BasePage>
    );
});
