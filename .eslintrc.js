module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    context: false,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'vue/script-indent': ['error', 2],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      ignores: ['router-link', 'router-view', 'transition'],
    }],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/singleline-html-element-content-newline': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'import/extensions': ['error', 'ignorePackages'],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off', // disables default indent rule to not interfere with `vue/script-indent`
        'default-case': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        'vue/script-indent': 'off',
      },
    },
    {
      files: ['*.spec.js'],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    }
  ],
};
