import React, { Component } from 'react';
import { Button } from '@components';
import styles from './About.module.scss';
import { logo } from '@assets';

class About extends Component {
    render() {
        return (
            <div className={styles.content}>
                <div className={styles.logWrap}>
                    <img src={logo} className={styles.logo} alt="logo" />{' '}
                </div>
                <div className={styles.text}>关于...</div>
                <Button>Normal</Button> &nbsp;&nbsp;
                <Button type="primary">Prirmary</Button> &nbsp;&nbsp;
                <Button type="secondary">Secondary</Button>
                <br />
                <Button size="xs" type="link">
                    Normal
                </Button>{' '}
                &nbsp;&nbsp;
                <Button size="xs" type="primary">
                    Primary
                </Button>{' '}
                &nbsp;&nbsp;
                <Button size="xs" type="secondary">
                    Secondary
                </Button>
            </div>
        );
    }
}
export default About;
