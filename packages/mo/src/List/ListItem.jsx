import classnames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './List.scss';

const Brief = ({ prefixCls, style, children }) => (
    <div className={`${prefixCls}-brief`} style={style}>
        {children}
    </div>
);

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coverRippleStyle: { display: 'none' },
            RippleClicked: false,
        };
        this.debounceTimeout = null;
    }

    componentDidMount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
    }

    onClick = (ev) => {
        const { onClick, platform } = this.props;
        const isAndroid = platform === 'android';
        if (!!onClick && isAndroid) {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }
            const Item = ev.currentTarget;
            const RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
            const ClientRect = ev.currentTarget.getBoundingClientRect();
            const pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
            const pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
            const coverRippleStyle = {
                width: `${RippleWidth}px`,
                height: `${RippleWidth}px`,
                left: `${pointX}px`,
                top: `${pointY}px`,
            };
            this.setState(
                {
                    coverRippleStyle,
                    RippleClicked: true,
                },
                () => {
                    this.debounceTimeout = setTimeout(() => {
                        this.setState({
                            coverRippleStyle: { display: 'none' },
                            RippleClicked: false,
                        });
                    }, 1000);
                }
            );
        }

        if (onClick) {
            onClick(ev);
        }
    };

    render() {
        const {
            prefixCls,
            className,
            activeStyle,
            error,
            align,
            wrap,
            to,
            disabled,
            children,
            multipleLine,
            thumb,
            extra,
            arrow,
            onClick,
            ...restProps
        } = this.props;
        const { platform, ...otherProps } = restProps;
        const { coverRippleStyle, RippleClicked } = this.state;

        const wrapCls = classnames(`${prefixCls}-item`, className, {
            [`${prefixCls}-item-disabled`]: disabled,
            [`${prefixCls}-item-error`]: error,
            [`${prefixCls}-item-top`]: align === 'top',
            [`${prefixCls}-item-middle`]: align === 'middle',
            [`${prefixCls}-item-bottom`]: align === 'bottom',
        });

        const rippleCls = classnames(`${prefixCls}-ripple`, {
            [`${prefixCls}-ripple-animate`]: RippleClicked,
        });

        const lineCls = classnames(`${prefixCls}-line`, {
            [`${prefixCls}-line-multiple`]: multipleLine,
            [`${prefixCls}-line-wrap`]: wrap,
        });

        const arrowCls = classnames(`${prefixCls}-arrow`, {
            [`${prefixCls}-arrow-horizontal`]: arrow === 'horizontal',
            [`${prefixCls}-arrow-vertical`]: arrow === 'down' || arrow === 'up',
            [`${prefixCls}-arrow-vertical-up`]: arrow === 'up',
        });

        const content = (
            <div
                {...otherProps}
                onClick={(ev) => {
                    this.onClick(ev);
                }}
                className={wrapCls}
            >
                {thumb ? (
                    <div className={`${prefixCls}-thumb`}>
                        {typeof thumb === 'string' ? <img src={thumb} alt={thumb} /> : thumb}
                    </div>
                ) : null}
                <div className={lineCls}>
                    {children !== undefined && <div className={`${prefixCls}-content`}>{children}</div>}
                    {extra !== undefined && <div className={`${prefixCls}-extra`}>{extra}</div>}
                    {arrow && <div className={arrowCls} aria-hidden="true" />}
                </div>
                <div style={coverRippleStyle} className={rippleCls} />
            </div>
        );
        const touchProps = {};
        Object.keys(otherProps).forEach((key) => {
            if (/onTouch/i.test(key)) {
                touchProps[key] = otherProps[key];
                delete otherProps[key];
            }
        });
        return (
            <div
                {...touchProps}
                disabled={disabled || !onClick}
                style={activeStyle}
                className={`${prefixCls}-item-active`}
            >
                {content}
            </div>
        );
    }
}

ListItem.defaultProps = {
    prefixCls: 'list',
    align: 'middle',
    error: false,
    multipleLine: false,
    wrap: false,
    platform: 'ios',
};
ListItem.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    align: PropTypes.string,
    error: PropTypes.bool,
    multipleLine: PropTypes.bool,
    wrap: PropTypes.bool,
    platform: PropTypes.string,
    onClick: PropTypes.func,
};
Brief.defaultProps = {
    prefixCls: 'list',
};
Brief.propTypes = {
    prefixCls: PropTypes.string,
};
ListItem.Brief = Brief;

export default ListItem;
