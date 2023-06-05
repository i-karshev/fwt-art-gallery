module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-restricted-exports': [0],
    'import/extensions': [0],
    'react/prop-types': [0],
    'react/react-in-jsx-scope': [0],
    'react/jsx-props-no-spreading': [0],
    'import/prefer-default-export': [0],
    'no-underscore-dangle': [0],
    'react/require-default-props': [0],
    'jsx-a11y/no-noninteractive-tabindex': [0],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
};
