import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import '../Card.scss';

const CardHeader = ({ prefixCls, className, title, thumb, thumbStyle, extra, ...restProps }) => {
    const wrapCls = classnames(`${prefixCls}-header`, className);

    return (
        <div className={wrapCls} {...restProps}>
            <div className={`${prefixCls}-header-content`}>
                {typeof thumb === 'string' ? <img style={thumbStyle} src={thumb} alt={thumb} /> : thumb}
                {title}
            </div>
            {extra ? <div className={`${prefixCls}-header-extra`}>{extra}</div> : null}
        </div>
    );
};

CardHeader.defaultProps = {
    prefixCls: 'card',
    thumbStyle: {},
};

CardHeader.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    thumbStyle: PropTypes.object,
};
export default CardHeader;
