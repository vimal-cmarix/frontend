module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    jest: true,
  },
  plugins: [
    "prettier"
  ],
  rules: {
    // 'prettier/prettier': 'error',
    // 'max-len': [
    //   'error',
    //   {
    //     code: 200,
    //   },
    // ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'prefer-promise-reject-errors': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['warn'],
    'no-return-assign': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': ['warn'],
    'import/prefer-default-export': ['off'],
    'spaced-comment': ['off'],
    'react/jsx-curly-newline': ['off'],
    'no-unused-expressions': ['off'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  globals: {
    rrSpace: true,
  },
};
