import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './BasicNotFound.module.scss';
import notFoundPic from './images/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png';

export default class BasicNotFound extends Component {
    render() {
        const { className, ...restProps } = this.props;
        return (
            <div className={`${styles.exceptionContent} ${className}`} {...restProps}>
                <img src={notFoundPic} className={styles.imgException} alt="页面不存在" />
                <div className="prompt">
                    <h3 className={styles.title}>抱歉，你访问的页面不存在</h3>
                    <p className={styles.description}>
                        您要找的页面没有找到，请返回
                        <Link to="/">首页</Link>
                        继续浏览
                    </p>
                </div>
            </div>
        );
    }
}
