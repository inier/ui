import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@components';
import { footerMenuConfig } from '@menuConfig';
import styles from './Footer.module.scss';

const Footer = ({ className }) => (
    <footer className={`${styles.footer} border-t ${className || ''}`}>
        {footerMenuConfig.map((item, index) => (
            <NavLink
                className={`${styles.item}`}
                key={`footer_${item.icon}`}
                to={item.path}
                exact
                activeClassName={styles.active}
                replace
            >
                <Icon name={item.icon} className={styles.icons} />
                <div>{item.name}</div>
            </NavLink>
        ))}
    </footer>
);

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
