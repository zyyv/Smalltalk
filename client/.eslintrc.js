module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    // 'eslint: recommended ',
    // 'plugin:vue/essential',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // '@typescript-eslint/no-explicit-any': ['off']
  }
}