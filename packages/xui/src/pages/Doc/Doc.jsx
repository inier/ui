import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Timer } from '@components';
import styles from './Doc.module.scss';
import logo from '@assets/img/logo.svg';

@withRouter
class Doc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBegin: false,
            isReset: false,
        };
    }

    render() {
        const { isBegin, isReset } = this.state;
        const doTxt = isBegin ? '暂停' : '开始';
        return (
            <div className={styles.content}>
                <div className={styles.logWrap}>
                    <img src={logo} className={styles.logo} alt="logo" />{' '}
                </div>
                <div style={{ color: '#fff', margin: '20px' }}>敬请期待...</div>
                <Timer tick={isBegin} reset={isReset} />
                <div className="btn-group">
                    <Button onClick={this.handleTimer}>{doTxt}</Button>
                    {/* <Button onClick={this.handleReset} disabled={isReset}>重置</Button> */}
                </div>
            </div>
        );
    }

    // 开始/暂停
    handleTimer = () => {
        const { isBegin } = this.state;
        this.setState({
            isBegin: !isBegin,
            isReset: false,
        });
    };

    // 重置
    handleReset = () => {
        this.setState({
            isBegin: false,
            isReset: true,
        });
    };
}

export default Doc;
