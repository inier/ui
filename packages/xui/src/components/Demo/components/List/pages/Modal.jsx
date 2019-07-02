import React, { Component } from 'react';
import { Button, Modal, Demo } from '@components';
const { DemoShow, Section, Block } = Demo;

class ModalDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isShow2: false,
            isShow3: false,
        };
    }

    render() {
        const { isShow, isShow2, isShow3 } = this.state;
        return (
            <DemoShow>
                <Section title="default">
                    <Block>
                        <div className="btn-group" style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        isShow: true,
                                    });
                                }}
                            >
                                Click me！
                            </Button>
                        </div>
                        {isShow && (
                            <Modal
                                title="标题"
                                onCancel={() => {
                                    this.setState({
                                        isShow: false,
                                    });
                                    console.log('取消');
                                }}
                                onDone={() => {
                                    this.setState({
                                        isShow: false,
                                    });
                                    console.log('确定');
                                }}
                            />
                        )}
                    </Block>
                </Section>
                <Section title="alert">
                    <Block>
                        <div className="btn-group" style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        isShow2: true,
                                    });
                                }}
                            >
                                Click me！
                            </Button>
                        </div>
                        {isShow2 && (
                            <Modal
                                type="alert"
                                title="标题"
                                onDone={() => {
                                    this.setState({
                                        isShow2: false,
                                    });
                                    console.log('确定');
                                }}
                            />
                        )}
                    </Block>
                </Section>
                <Section title="layer">
                    <Block>
                        <div className="btn-group" style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        isShow3: true,
                                    });
                                }}
                            >
                                Click me！
                            </Button>
                        </div>
                        {isShow3 && (
                            <Modal
                                type="layer"
                                title="标题"
                                onDone={() => {
                                    this.setState({
                                        isShow3: false,
                                    });
                                    console.log('确定');
                                }}
                                onCancel={() => {
                                    this.setState({
                                        isShow3: false,
                                    });
                                    console.log('取消');
                                }}
                            />
                        )}
                    </Block>
                </Section>
            </DemoShow>
        );
    }
}

export default ModalDemo;
