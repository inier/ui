import React from 'react';
import { BasePage, Header, PageContainer } from '@components';
import Footer from './components/Footer';
import { getPageTitle } from '@utils';
import routerData from '@routerConfig';
import mainRoutes from './MainRoutes';

export default ({ location }) => {
    return (
        <BasePage>
            <Header title={getPageTitle(location, routerData)} noBack />
            <PageContainer>{mainRoutes(routerData)}</PageContainer>
            <Footer />
        </BasePage>
    );
};
