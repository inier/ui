import React, { Component } from 'react';
import { InputSingle, Demo } from '@components';
const { DemoShow, Section } = Demo;

class InputDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            mobile: '',
            cardID: '',
        };
    }

    render() {
        const { userName, mobile, cardID } = this.state;
        return (
            <DemoShow>
                <Section title="输入框">
                    <InputSingle
                        title="姓名"
                        name="userName"
                        className="border-b"
                        placeholder="请输入姓名"
                        labelStyle={{ minWidth: '3em' }}
                        value={userName}
                        handleChange={this.handleUserChange}
                    />
                    <InputSingle
                        type="number"
                        title="手机号"
                        placeholder="请输入手机号码"
                        className="border-b"
                        labelStyle={{ minWidth: '3em' }}
                        value={mobile}
                        handleChange={this.handleMobileChange}
                    />
                    <InputSingle
                        type="IDCard"
                        title="身份证"
                        placeholder="请输入身份证号码"
                        labelStyle={{ minWidth: '3em' }}
                        value={cardID}
                        handleChange={this.handleCardIDChange}
                    />
                </Section>
            </DemoShow>
        );
    }

    // 姓名输入
    handleUserChange = (value) => {
        this.setState({
            userName: value,
        });
    };

    // 手机号输入
    handleMobileChange = (value) => {
        this.setState({
            mobile: value,
        });
    };

    // 身份证号输入
    handleCardIDChange = (value) => {
        this.setState({
            cardID: value,
        });
    };
}

export default InputDemo;
