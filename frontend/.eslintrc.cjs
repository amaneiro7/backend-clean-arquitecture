module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './frontend/tsconfig.json'
    },
    "plugins": [
        "react"
    ],
    "rules": {
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/react-in-jsx-scope': 'off',        
        'react/prop-types': 'off',        
        '@typescript-eslint/method-signature-style': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
    }
}
