import React from 'react';
import { Demo, Icon } from '@components';
const { DemoShow, Section, Block } = Demo;

export default () => (
    <DemoShow>
        <Section title="size">
            <Block
                style={{
                    lineHeight: 2,
                }}
            >
                <Icon name="home" size="xs" />
                <Icon name="home" />
                <Icon name="home" size="sm" />
                <Icon name="home" size="md" />
                <Icon name="home" size="lg" />
                <Icon name="home" size="xl" />
            </Block>
        </Section>
        <Section title="custom">
            <Block
                style={{
                    lineHeight: 2,
                }}
            >
                <Icon name="home" size="xs" style={{ color: '#f00' }} />
                <Icon name="home" style={{ color: '#f33' }} />
                <Icon name="home" size="md" style={{ color: '#f66' }} />
                <Icon name="home" size="lg" style={{ color: '#f99' }} />
                <Icon name="home" size="xl" style={{ color: '#faa' }} />
            </Block>
            <hr />
            <Block flex>
                <Icon name="home" style={{ color: '#f00', fontSize: '30px' }} />
                <Icon name="home" style={{ marginRight: '50px' }} />
                <Icon name="home" size="md" style={{ transform: 'rotate(90deg)' }} />
                <Icon name="home" size="lg" className="ani-circle" />
            </Block>
        </Section>
    </DemoShow>
);
