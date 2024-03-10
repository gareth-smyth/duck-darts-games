import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';

export default tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    prettierConfig,
    eslintPluginPrettierRecommended,
    {
        ignores: ['dist/*'],
    },
    {
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
    },
);
