import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, DemoShow, Section, Block } from '../../../../components';

storiesOf('Button', module).add('react Button', () => (
    <DemoShow>
        <Section title="size">
            <Block flex>
                <Button size="xs">btn-xs</Button>
                <Button size="xs" disabled>
                    btn-xs disabled
                </Button>
                <Button size="xs" noRadius>
                    btn-xs noRadius
                </Button>
                <Button size="xs" active>
                    btn-xs active
                </Button>
                <Button size="sm">btn-sm</Button>
                <Button size="md">btn-md</Button>
                <Button>btn-md(默认)</Button>
                <Button size="lg">btn-lg</Button>

                <Button size="xl">btn-xl</Button>
            </Block>
        </Section>
    </DemoShow>
));
