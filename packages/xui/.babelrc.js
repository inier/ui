// const map = {
//     lazy: 'LazyLoader/Lazy',
// };
// [
//     'import',
//     {
//         libraryName: 'my-react',
//         camel2UnderlineComponentName: false,
//         camel2DashComponentName: false,
//         customName: function(name) {
//             console.log(name);
//             if (!map[name]) {
//                 console.log(name);
//             }

//             return `my-react/${map[name]}`;
//         },
//     },
//     'my-react',
// ],

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
