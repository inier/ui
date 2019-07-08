// http://react-component.github.io/collapse/
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import RcCollapse, { Panel } from 'rc-collapse';
// import 'rc-collapse/assets/index.css';
import './Collapse.scss';

const Collapse = ({ prefixCls, full, noRadius, gutter, className, ...resetProps }) => {
    const wrapCls = classnames(className, {
        [`${prefixCls}-full`]: full,
        [`${prefixCls}-radius`]: !noRadius,
        [`${prefixCls}-gutter`]: gutter,
    });
    return (
        <div style={{ width: '100%' }}>
            <RcCollapse className={wrapCls} prefixCls={prefixCls} {...resetProps} />
        </div>
    );
};

Collapse.defaultProps = {
    prefixCls: 'collapse',
    full: false,
    noRadius: false,
    gutter: false,
};
Collapse.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    gutter: PropTypes.bool,
    full: PropTypes.bool,
    noRadius: PropTypes.bool,
    accordion: PropTypes.bool,
    openAnimation: PropTypes.object,
};
Collapse.Panel = Panel;

export default Collapse;
