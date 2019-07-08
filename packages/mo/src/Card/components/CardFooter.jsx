import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import '../Card.scss';

const CardFooter = ({ prefixCls, content, className, extra, ...restProps }) => {
    const wrapCls = classnames(`${prefixCls}-footer`, className);

    return (
        <div className={wrapCls} {...restProps}>
            <div className={`${prefixCls}-footer-content`}>{content}</div>
            {extra && <div className={`${prefixCls}-footer-extra`}>{extra}</div>}
        </div>
    );
};

CardFooter.defaultProps = {
    prefixCls: 'card',
};

CardFooter.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
};

export default CardFooter;
