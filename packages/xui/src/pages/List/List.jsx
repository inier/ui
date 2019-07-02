import React, { Component } from 'react';
import { Demo, DemoEntrance, Placeholder } from '@components';
const { DemoShow, Section } = Demo;

class ListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // activeKey: 0,
        };
    }

    render() {
        return (
            <DemoShow>
                <Section>
                    <DemoEntrance />
                </Section>
                <Section />
                <Placeholder msg="没有更多了！" />
            </DemoShow>
        );
    }
}

export default ListDemo;
