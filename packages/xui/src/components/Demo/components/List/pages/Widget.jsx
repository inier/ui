import React from 'react';
import { Demo } from '@components';
const { DemoShow, Section, Block } = Demo;

export default () => (
    <DemoShow>
        <Section title="边框">
            <Block flex>
                <span className="border-t">上</span>
                <span className="border-r">右</span>
                <span className="border-b">下</span>
                <span className="border-l">左</span>
                <span className="border-v">上+下</span>
                <span className="border-l border-r">左+右</span>
                <span className="border">四边</span>
                <span className="border-radius">四边+圆角</span>
            </Block>
        </Section>
        <Section title="三角形">
            <Block flex>
                <span className="triangle-t" />
                <span className="triangle-r" />
                <span className="triangle-b" />
                <span className="triangle-l" />
            </Block>
        </Section>
        <Section title="小箭头">
            <Block flex>
                <span className="arrow-t" />
                <span className="arrow-r" />
                <span className="arrow-b" />
                <span className="arrow-l" />
            </Block>
        </Section>
    </DemoShow>
);
