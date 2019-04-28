module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:prettier/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'operator-linebreak': ['error', 'after'],
    'comma-dangle': [2, 'always-multiline'],
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
