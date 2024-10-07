module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/all',
  ],
  ignorePatterns: [
    '.archive', // KSN TODO: remove archive
    'src/stories/**/*', // KSN TODO: remove example stories
    'dist',
    'node_modules',
  ],
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.cjs'],
    },
    {
      files: ['!src'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
    'react',
    'react-refresh',
    'simple-import-sort',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-max-depth': ['error', { max: 3 }],
    'react/jsx-no-literals': 0,
    'react/require-default-props': [2, {
      functions: 'defaultArguments',
    }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
