import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import '../Card.scss';

const CardBody = ({ prefixCls, className, ...restProps }) => {
    const wrapCls = classnames(`${prefixCls}-body`, className);

    return <div className={wrapCls} {...restProps} />;
};

CardBody.defaultProps = {
    prefixCls: 'card',
    className: '',
};

CardBody.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
};

export default CardBody;
