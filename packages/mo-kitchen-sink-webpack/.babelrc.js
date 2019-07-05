module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'lodash-es',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'lodash',
        ],
        [
            'import',
            {
                libraryName: '@alifd/next',
                libraryDirectory: 'es',
            },
            '@alifd',
        ],
        [
            'import',
            {
                libraryName: '@components',
                libraryDirectory: 'es',
                camel2DashComponentName: false,
                customName: (name) => `../${name}`, // 这里的customName可以是一个函数，定义如何转化文件路径
                style: true,
            },
            '@ozo/mo',
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
    env: {
        development: {
            presets: ['react-app'],
        },
        production: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'usage',
                        corejs: 3,
                    },
                ],
                'react-app',
            ],
        },
        test: {},
    },
};
