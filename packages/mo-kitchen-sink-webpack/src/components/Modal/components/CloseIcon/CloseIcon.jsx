import React from 'react';
import PropTypes from 'prop-types';
import styles from './CloseIcon.module.scss';

const CloseIcon = ({ size, handleClick }) => <i className={`${styles.close} ${styles[size]}`} onClick={handleClick} />;

CloseIcon.propTypes = {
    size: PropTypes.oneOf(['ms', 'lg']),
    handleClick: PropTypes.func,
};

export default CloseIcon;
