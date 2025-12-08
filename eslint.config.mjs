// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            semi: ["warn", "always"],
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-unsafe-enum-comparison": "off",
            "@typescript-eslint/prefer-readonly": "warn",
            "@typescript-eslint/explicit-member-accessibility": "error"
            
        }
    }
);