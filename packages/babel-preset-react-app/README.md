# @alifd/babel-preset-next
A babel preset for Next Component.

[![npm package](https://img.shields.io/npm/v/@alifd/babel-preset-next.svg?style=flat-square)](https://www.npmjs.org/package/@alifd/babel-preset-next)

## Install

```
npm install @alifd/babel-preset-next --save-dev
```

## Presets & Plugins

* babel-preset-react
* babel-preset-env
* babel-preset-stage-0
* babel-plugin-transform-decorators-legacy
* babel-plugin-transform-object-assign
* babel-plugin-transform-react-es6-displayname
* babel-plugin-add-module-exports
* babel-plugin-transform-proto-to-assign
* babel-plugin-transform-runtime

## Options
* modules: from [babel-preset-env](https://github.com/babel/babel-preset-env#modules), if not set it, will append [babel-plugin-add-module-exports](https://github.com/59naga/babel-plugin-add-module-exports) to preset
* runtime: whether or not use [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/), default value is false
