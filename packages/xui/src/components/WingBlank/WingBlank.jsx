import React from 'react';
import styles from './WingBlank.module.scss';
/**
 * 左右留白距离
 *
 * @param {*} props 组件参数 padWidth:左右留白距离num
 * @returns 组件
 */
function WingBlank(props) {
    // 左右留白距离
    const { className, style, padWidth, children } = props;
    const styleObj = {
        paddingLeft: `${padWidth}px`,
        paddingRight: `${padWidth}px`,
        ...style,
    };
    return (
        <div className={`${styles.wingBlank} ${className || ''}`} style={styleObj}>
            {children}
        </div>
    );
}

export default WingBlank;
