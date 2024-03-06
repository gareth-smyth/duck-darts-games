import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    eslintPluginPrettierRecommended,
    {
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
    },
);
