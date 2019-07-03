import { configure } from '@storybook/react';

const req = require.context('../packages/', true, /stories\/.+.js$/);
const loadStories = () => {
  require('../src/stories'); // 加载stories根目录下的storybook
  req.keys().forEach((module) => req(module)); // 加载各个组件目录下的storybook
};

configure(loadStories, module);
