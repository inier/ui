import React from 'react';
import PropTypes from 'prop-types';
import styles from './CloseIcon.module.scss';

const CloseIcon = ({ handleClick }) => <i className={`${styles.close}`} onClick={handleClick} />;

CloseIcon.propTypes = {
    handleClick: PropTypes.func,
};

export default CloseIcon;
