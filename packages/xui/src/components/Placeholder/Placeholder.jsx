import React from 'react';
import PropTypes from 'prop-types';
import styles from './Placeholder.module.scss';

const placeholder = ({ msg }) => <div className={styles.placeholder}>{msg}</div>;
placeholder.defaultProps = {
    msg: '暂无数据',
};
placeholder.propTypes = {
    msg: PropTypes.string,
};
export default placeholder;
