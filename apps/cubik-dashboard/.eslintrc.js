module.exports = {
  ...require('@cubik/presets/eslint/eslint-preset'),
  root: true,
  extends: ['plugin:tailwindcss/recommended'],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
