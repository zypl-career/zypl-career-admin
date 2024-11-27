module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@tanstack/query'],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': ['off'],
    quotes: ['error', 'single'],
    semi: ['warn', 'always'],
    '@tanstack/query/exhaustive-deps': 'error',
    'no-console': 'warn',
    'jsx-quotes': ['error', 'prefer-double'],
    'prefer-const': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'max-len': [
      'error',
      120,
      { ignoreTemplateLiterals: true, ignoreStrings: true }
    ],
    'eol-last': ['warn', 'always'],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true
      }
    ],
  },
};
