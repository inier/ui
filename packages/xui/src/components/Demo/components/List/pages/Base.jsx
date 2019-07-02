import React from 'react';
import { Heading, Demo } from '@components';
const { DemoShow, Section } = Demo;

export default () => (
    <DemoShow>
        <Section title="Heading">
            <Heading title="Default" />
            <Heading align="center" title="Default" />
            <Heading align="end" title="Default" />
        </Section>
    </DemoShow>
);
