import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RadioGroup extends Component {
    static defaultProps = {
        Component: 'div',
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        selectedValue: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired,
            PropTypes.bool.isRequired,
        ]),
        children: PropTypes.node.isRequired,
        Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
        onChange: PropTypes.func,
    };

    static childContextTypes = {
        radioGroup: PropTypes.object,
    };

    getChildContext() {
        const { name, selectedValue, onChange } = this.props;
        return {
            radioGroup: {
                name,
                selectedValue,
                onChange,
            },
        };
    }

    render() {
        const { Component, name, selectedValue, onChange, children, ...rest } = this.props;
        return (
            <Component role="radiogroup" {...rest}>
                {children}
            </Component>
        );
    }
}
