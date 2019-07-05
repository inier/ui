import React from 'react';
import styles from './WhiteSpace.module.scss';
/**
 * 间距高度，分离上下距离
 *
 * @param {*} props 组件参数 height间距高度，number /默认10
 * @returns 组件
 */
function WhiteSpace(props) {
    // 行留白距离
    const { className, height } = props;
    const styleObj = {
        height: `${height}px`,
    };
    return <div className={`${styles.whiteSpace} ${className || ''}`} style={height && styleObj} />;
}

export default WhiteSpace;
