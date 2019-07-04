// .eslintrc.js
module.exports = {
  globals: {
    React: true,
    ReactDOM: true,
    mountNode: true,
    document: true,
    i18n: true,
    navigator: true,
    node: true,
    require: false,
    window: true,
    $: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.0'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },
  // 开启推荐配置信息
  extends: ['react-app', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'markdown'],
  // 启用的规则及各自的错误级别
  rules: {
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'brace-style': 'error',
    camelcase: 'warn',
    'class-methods-use-this': 0,
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore'
      }
    ],
    complexity: [2, 20],
    'consistent-return': 0,
    'default-case': 'error',
    'dot-notation': 'warn',
    eqeqeq: ['warn', 'smart'],
    'func-names': 0,
    'guard-for-in': 'warn',
    'i18n/no-chinese-character': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/img-has-alt': 0,
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'max-depth': [2, 4],
    'max-len': 0,
    'max-params': ['warn', 5],
    'max-statements': [2, 50],
    'new-cap': 'error',
    'no-await-in-loop': 'warn',
    'no-bitwise': 'warn',
    'no-cond-assign': 'error',
    'no-confusing-arrow': 'error',
    'no-console': 'off',
    'no-constant-condition': 'off',
    'no-continue': 'error',
    'no-duplicate-imports': 'error',
    'no-empty-function': 'warn',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'warn',
    'no-extra-boolean-cast': 'error',
    'no-floating-decimal': 'warn',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lonely-if': 'warn',
    'no-loop-func': 'warn',
    'no-magic-numbers': [
      'off',
      {
        enforceConst: true,
        ignoreArrayIndexes: true,
        ignore: [0, 1, -1, 400, 404, 500]
      }
    ],
    'no-mixed-operators': 'warn',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'warn',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'warn',
    'no-plusplus': [0, { allowForLoopAfterthoughts: true }],
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-sequences': 'error',
    'no-trailing-spaces': ['warn', { skipBlankLines: true }],
    'no-undef': 2,
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 1,
    'no-unused-vars': 'warn',
    'no-use-before-define': 'warn',
    'no-useless-call': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'warn',
    'no-restricted-syntax': 1,
    'no-var': 2,
    'no-with': 'error',
    'object-curly-newline': 0,
    'prefer-arrow-callback': 'warn',
    'prefer-destructuring': 0,
    'prefer-template': 'error',
    'prettier/prettier': 'warn',
    'react/destructuring-assignment': 1,
    'react/require-default-props': 0,
    'react/default-props-match-prop-types': 1,
    'react/forbid-prop-types': 0,
    'react/jsx-boolean-value': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.md'] }],
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-no-bind': [0],
    'react/jsx-no-comment-textnodes': 0,
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore'
      }
    ],
    'react/no-array-index-key': 'warn',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-find-dom-node': 0,
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': [
      'warn',
      {
        ignoreStateless: true
      }
    ],
    'react/no-unescaped-entities': 'error',
    'react/no-unused-state': 'error',
    'react/no-unused-prop-types': 1,
    'react/no-render-return-value': 0,
    'react/no-string-refs': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-stateless-function': [0],
    'react/prefer-es6-class': 'error',
    'react/prop-types': [0],
    'react/react-in-jsx-scope': 2,
    'react/require-extension': 0,
    'react/self-closing-comp': 'warn',
    'react/sort-comp': 0,
    'require-await': 'error',
    'valid-jsdoc': [
      'warn',
      {
        requireReturn: false,
        requireReturnDescription: false,
        requireReturnType: false
      }
    ]
  }
};
