import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import CardBody from './components/CardBody';
import CardFooter from './components/CardFooter';
import CardHeader from './components/CardHeader';
import './Card.scss';

const Card = ({ prefixCls, full, noRadius, className, ...resetProps }) => {
    const wrapCls = classnames(prefixCls, className, {
        [`${prefixCls}-full`]: full,
        [`${prefixCls}-radius`]: !noRadius,
    });
    return <div className={wrapCls} {...resetProps} />;
};

Card.defaultProps = {
    prefixCls: 'card',
    full: false,
    noRadius: false,
};
Card.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    full: PropTypes.bool,
    noRadius: PropTypes.bool,
};
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
