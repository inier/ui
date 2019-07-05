// Button/src/stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../Button';

storiesOf('Button', module).add('Button', () => <Button handleOnclick={action('clicked')} />);
