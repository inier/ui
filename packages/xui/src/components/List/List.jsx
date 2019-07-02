import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Item from './ListItem';
import './List.scss';

const List = ({ prefixCls, children, className, style, renderHeader, renderFooter, ...restProps }) => {
    const wrapCls = classnames(prefixCls, className);
    return (
        <div className={wrapCls} style={style} {...restProps}>
            {renderHeader ? (
                <div className={`${prefixCls}-header`}>
                    {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
                </div>
            ) : null}
            {children ? <div className={`${prefixCls}-body`}>{children}</div> : null}
            {renderFooter ? (
                <div className={`${prefixCls}-footer`}>
                    {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
                </div>
            ) : null}
        </div>
    );
};
List.defaultProps = {
    prefixCls: 'list',
};
List.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    role: PropTypes.string,
    style: PropTypes.object,
};
List.Item = Item;
export default List;
