import React from 'react';
import '@node_modules/balloon-css/src/balloon.scss';
import { Demo } from '@components';
const { DemoShow, Section, Block } = Demo;

export default () => (
    <DemoShow>
        <Section title="示例：">
            <Block flex>
                <button data-balloon="Whats up!" data-balloon-pos="up">
                    Hover me!
                </button>
                <button data-balloon="Whats up!" data-balloon-pos="left">
                    Hover me!
                </button>
                <button data-balloon="Whats up!" data-balloon-pos="right">
                    Hover me!
                </button>
                <button data-balloon="Whats up!" data-balloon-pos="down">
                    Hover me!
                </button>
                <button data-balloon="Whats up!" data-balloon-pos="up-left">
                    Hover me!
                </button>
                <button data-balloon="Whats up!" data-balloon-pos="up-right">
                    Hover me!
                </button>
                <button data-balloon="Whats up!" data-balloon-pos="down-left">
                    Hover me!
                </button>
                <button data-balloon="Whats up!" data-balloon-pos="down-right">
                    Hover me!
                </button>
            </Block>
        </Section>
    </DemoShow>
);
