import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  sortImports: true,
  ignorePatterns: ['dist/**', 'dev-dist/**', '*.html'],
});
