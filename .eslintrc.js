module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    strict: 1,
    semi: [2, 'never'],
    curly: [2, 'all'],
    'consistent-return': 0,
    'spaced-comment': 0,
    'arrow-body-style': 0,
    'block-spacing': 2,
    'space-before-function-paren': [2, 'always'],
    'no-unused-vars': 0,
    'no-shadow': 0,
    'comma-dangle': [2, "always-multiline"],
    'no-console': 0,
    'no-alert': 0,
    'no-multiple-empty-lines': 0,
    'no-unexpected-multiline': 2,
    'no-nested-ternary': 0,
    'max-len': 0,
    'padded-blocks': 0,
    'no-param-reassign': 0,
    'no-var': 0,
    'vars-on-top': 0,
    'new-cap': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-closing-bracket-location': [2, 'props-aligned'],
    'react/jsx-curly-spacing': [2, 'always'],
    'react/no-multi-comp': 0,
    'camelcase': 0,
    'import/no-unresolved': 0
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
  },
  env: {
    browser: false,
    node: true
  }
}
