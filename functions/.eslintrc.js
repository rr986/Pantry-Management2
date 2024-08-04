module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-unused-vars': 'off',  // Turn off no-unused-vars rule
    'no-console': 'off',      // Allow console statements
  },
};
