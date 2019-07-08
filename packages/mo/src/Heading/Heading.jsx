import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './Heading.scss';

const Heading = ({ prefixCls, title, align, thumb, thumbStyle, extra, className, children, ...restProps }) => {
    const wrapCls = classnames(prefixCls, className, {
        [`${prefixCls}-${align}`]: align,
    });
    return (
        <div className={wrapCls} {...restProps}>
            {children || (
                <React.Fragment>
                    <div className={`${prefixCls}-content`}>
                        {thumb && (
                            <div className={`${prefixCls}-thumb`}>
                                {typeof thumb === 'string' ? <img style={thumbStyle} src={thumb} alt={thumb} /> : thumb}
                            </div>
                        )}
                        {title}
                    </div>
                    {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
                </React.Fragment>
            )}
        </div>
    );
};
Heading.defaultProps = {
    prefixCls: 'heading',
    align: 'start',
    thumbStyle: {},
    className: '',
};

Heading.propTypes = {
    prefixCls: PropTypes.string,
    align: PropTypes.oneOf(['start', 'center', 'end']),
    className: PropTypes.string,
    style: PropTypes.object,
    thumb: PropTypes.node || PropTypes.string,
    thumbStyle: PropTypes.object,
};

export default Heading;
