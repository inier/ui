import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Icon';
import styles from './Radio.module.scss';

const Radio = ({ children, value, defaultChecked, ...restProps }, { radioGroup }) => {
    const { name, selectedValue, onChange } = radioGroup;
    const optional = {};
    let iconName = 'unchecked';

    if (selectedValue !== undefined) {
        optional.checked = value === selectedValue;
    }

    if (typeof onChange === 'function') {
        optional.onChange = onChange.bind(null, value);
    }

    optional.checked && (iconName = 'checked-solid');

    return (
        <label className={styles.radioWrap}>
            <input
                checked="checked"
                aria-checked={optional.checked}
                type="radio"
                name={name}
                {...restProps}
                {...optional}
            />
            {children}
            <Icon name={iconName} className={styles.radioIcon} />
        </label>
    );
};
Radio.contextTypes = {
    radioGroup: PropTypes.object,
};
Radio.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired, PropTypes.bool.isRequired]),
    disabled: PropTypes.bool,
};

export default Radio;
