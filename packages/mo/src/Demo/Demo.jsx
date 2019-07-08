import React from 'react';
import { CardLite, WhiteSpace, WingBlank } from '..';

import './pageView.scss';

export const DemoShow = ({ className, style, children }) => (
    <WingBlank className={`page-view ${className || ''}`} style={style}>
        {children}
    </WingBlank>
);

export const SectionCard = ({ title, full, style, children }) => (
    <React.Fragment>
        <CardLite full={full} title={title} style={style}>
            {children}
        </CardLite>
        <WhiteSpace />
    </React.Fragment>
);

export const Section = ({ flex, title, tips, style, children }) => (
    <div className={`section ${flex ? 'flex' : ''}`} style={style}>
        {title && <div className="h2">{title}</div>}
        {children}
        {tips && <div>{tips}</div>}
    </div>
);

export const Block = ({ flex, title, tips, style, children }) => (
    <div className={`block ${flex ? 'flex' : ''}`} style={style}>
        {title && <div className="h3">{title}</div>}
        {children}
        {tips && <div>{tips}</div>}
    </div>
);
