import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './Entrance.module.scss';
import logo from '@assets/img/logo.svg';
// import '../../demo.es6.js';

@withRouter
class Entrance extends Component {
    static displayName = 'Learn React';

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.content}>
                <div className={styles.logWrap}>
                    <img src={logo} className={styles.logo} alt="logo" />{' '}
                </div>
                <a
                    className={`${styles.link} ${styles.text}`}
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <br />
                <Link to="/list" className={styles.text}>
                    {process.env.REACT_APP_NAME} 组件库 &gt;
                </Link>
                <div style={{ fontSize: '12px', color: '#999' }}>版本号：{process.env.REACT_APP_VERSION}</div>
            </div>
        );
    }
}

export default Entrance;
