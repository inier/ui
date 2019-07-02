import React from 'react';
import { Demo } from '@components';
const { DemoShow, Section, Block } = Demo;

export default () => (
    <DemoShow>
        <Section title="线中夹文字">
            <Block>
                <div className="side-line">文字</div>
                <div className="side-line-dash">文字</div>
                <div className="side-line-double">文字</div>
            </Block>
        </Section>
    </DemoShow>
);
