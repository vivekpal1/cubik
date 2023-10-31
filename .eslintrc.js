const preset = require('./packages/presets/eslint-preset');

module.exports = {
  ...preset,
  rules: {
    ...preset.rules,
    '@typescript-eslint/no-unused-vars': 'off', 
    'react-hooks/exhaustive-deps': 'warn'
  }
};
