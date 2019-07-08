import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Timer.module.scss';

class Timer extends Component {
    constructor(props) {
        super(props);
        const { start } = this.props;
        this.state = {
            total: start,
        };
    }

    timerStart = () => {
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => this.tick(), 1000);
    };

    timerStop = () => {
        this.timer && clearInterval(this.timer);
    };

    tick = () => {
        const { step, tick } = this.props;
        const { total } = this.state;
        if (tick) {
            this.setState({ total: total + step });
        }
    };

    componentDidMount() {
        this.timerStart();
    }

    componentWillUnmount() {
        //在unmount回调清除定时器
        this.timerStop();
    }

    render() {
        const { total } = this.state;
        return (
            <div className={styles.timer}>
                <div className={styles.show}>{total}</div>
            </div>
        );
    }
}

Timer.defaultProps = {
    start: 0,
    step: 1,
};

Timer.propTypes = {
    // 起始值
    start: PropTypes.number,
    // 步进值
    step: PropTypes.number,
    // 是否自动开始计时
    tick: PropTypes.bool,
};

export default Timer;
