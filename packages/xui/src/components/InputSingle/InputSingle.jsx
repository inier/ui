import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import CloseIcon from './components/CloseIcon';
import styles from './InputSingle.module.scss';

/**
 * 输入组件
 */
class InputSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClose: false, // (props.value && !props.disabled) ? true : false
        };
        this.id = shortid.generate();
    }

    render() {
        const { title, type, className, handleChange, size, labelStyle, ...tProps } = this.props;
        const { showClose } = this.state;
        return (
            <div className={`inputItemFix ${styles.inputItem} ${styles[size] || ''} ${className || ''}`}>
                <label htmlFor={this.id}>
                    <span className={styles.label} style={labelStyle}>
                        {title}
                    </span>
                    <input
                        id={this.id}
                        type={type || 'text'}
                        onChange={this.handleChange}
                        onFocus={this.handleCloseShowOnFocus}
                        onBlur={this.handleCloseHideOnBlur}
                        autoComplete="off"
                        {...tProps}
                    />
                </label>
                {showClose && <CloseIcon handleClick={this.handleCloseClick} />}
            </div>
        );
    }

    /**
     * @description 处理输入框 change 事件
     * @param {dom} e 输入框 input元素
     */
    handleChange = (e) => {
        const val = e.target.value;
        let tRule = '';
        let ruleCheckResult;
        const { type = 'text', rule, maxLength, handleChange } = this.props;

        // 正则检测，只检测16个字符
        switch (type) {
            case 'text': {
                // 默认可包含中文、字符、数字、下划线
                tRule = rule || `^[a-zA-Z0-9_\\u4e00-\\u9fa5]{0,${maxLength || '16'}}$`;
                break;
            }
            case 'number': {
                // 默认匹配1开头的数字
                tRule = rule || `^1([0-9]{0,${maxLength - 1 || '10'}})$`;
                break;
            }
            case 'IDCard': {
                // 身份证简单验证
                tRule = `^[0-9]{0,${maxLength - 1 || '17'}}([0-9]|X|x)$`;
                break;
            }
            default: {
                break;
            }
        }

        const checker = new RegExp(tRule);
        if (val && !checker.test(val)) {
            return;
        }

        if (val) {
            this.setState({ showClose: true });
        } else {
            this.setState({ showClose: false });
        }

        // 身份证单独验证
        if (type === 'IDCard' && (val.length === 16 || val.length === 19)) {
            ruleCheckResult = new RegExp(rule || '(^\\d{15}$)|(^\\d{17}([0-9]|X|x)$)').test(val);
        } else if (val.length > 19) {
            return;
        }

        handleChange && handleChange(val, ruleCheckResult);
    };

    componentWillUnmount() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = null;
    }

    /**
     * @description 处理输入框 聚焦 事件
     * @param {dom} e 输入框 input元素
     */
    handleCloseShowOnFocus = (e) => {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        e.target.value && this.setState({ showClose: true });
    };

    handleCloseHideOnBlur = () => {
        this.debounceTimeout = setTimeout(() => {
            this.setState({ showClose: false });
        }, 150);
    };

    handleCloseClick = () => {
        this.setState({ showClose: false });
        const { handleChange } = this.props;
        handleChange && handleChange('');
    };
}
InputSingle.propTypes = {
    // 输入框类型，默认值：text
    type: PropTypes.oneOf(['text', 'number', 'IDCard']),
    // 输入框名称
    name: PropTypes.string,
    // 输入框的label，必传
    title: PropTypes.string.isRequired,
    // 占位文字
    placeholder: PropTypes.string,
    // 叠加的css类名
    className: PropTypes.string,
    // 是否允许输入
    disabled: PropTypes.bool,
    // 输入框的值，受控
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // 允许输入最大长度
    maxLength: PropTypes.number,
    // value改变回调
    handleChange: PropTypes.func,
};
export default InputSingle;
