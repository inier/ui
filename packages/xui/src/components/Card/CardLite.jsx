import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const CardLite = ({ prefixCls, full, noRadius, title, header, footer, className, children, ...resetProps }) => {
    const wrapCls = classnames(prefixCls, className, {
        [`${prefixCls}-full`]: full,
        [`${prefixCls}-radius`]: !noRadius,
    });
    return (
        <div className={wrapCls} {...resetProps}>
            {(title || header) && (
                <div className={`${prefixCls}-header`}>
                    {header || <div className={`${prefixCls}-header-content`}>{title}</div>}
                </div>
            )}
            {children && <div className={`${prefixCls}-body`}>{children}</div>}
            {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        </div>
    );
};

CardLite.defaultProps = {
    prefixCls: 'card',
    full: false,
    noRadius: false,
    className: '',
    title: '标题',
    header: null,
    footer: null,
};
CardLite.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    header: PropTypes.node,
    footer: PropTypes.node,
    noRadius: PropTypes.bool,
    full: PropTypes.bool,
};

export default CardLite;
