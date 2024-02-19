module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "prettier",
    "plugin:prettier/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: "./tsconfig.json" },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'linebreak-style': 0,
    "@typescript-eslint/no-unnecessary-condition": "error"
  },
  overrides: [
    {
      "files": ["*.js", "*.jsx"],
      "rules": {
        "@typescript-eslint/no-unnecessary-condition": "off"
      }
    }
  ]
}
