module.exports = {
    root: true,
    env: { 
        browser: true, 
        es2020: true,
        node: true 
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'import',
        'react-hooks',
        'prettier',
        'jsx-a11y',
    ],
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    reportUnusedDisableDirectives: true,
    rules: {
        // React
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/interactive-supports-focus': 'warn',
        
        // TypeScript
        '@typescript-eslint/no-unused-vars': ['warn', { 
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        
        // Import
        'import/order': [
            'error',
            {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    ['parent', 'sibling'],
                    'index',
                    'object',
                    'type'
                ],
                'pathGroups': [
                    {
                        'pattern': 'react',
                        'group': 'external',
                        'position': 'before'
                    }
                ],
                'pathGroupsExcludedImportTypes': ['react'],
                'newlines-between': 'always',
                'alphabetize': { order: 'asc', caseInsensitive: true }
            }
        ],
        
        // Prettier
        'prettier/prettier': 'warn',
        
        // Style and spacing warnings (these are often more visible)
        'comma-spacing': 'warn',
        'key-spacing': 'warn',
        'keyword-spacing': 'warn',
        'space-before-blocks': 'warn',
        'space-infix-ops': 'warn',
        
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'eqeqeq': ['warn', 'always'],
        'no-trailing-spaces': 'warn',
        'no-multi-spaces': 'warn',
        'semi': ['warn', 'always'],  
        
        'no-constant-binary-expression': 'error',
        'no-constant-condition': 'error',
        'no-self-compare': 'error',
        'no-unreachable': 'error',
        'no-unneeded-ternary': 'error',
        'jsx-a11y/alt-text': 'warn',
    },
    ignorePatterns: [
        'dist', 
        'build',
        'node_modules',
        '.eslintrc.cjs',
        'vite.config.ts',
        'public'
    ]
}
