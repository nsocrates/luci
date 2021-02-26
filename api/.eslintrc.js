module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
    },
    "rules": {
        "semi": ["error", "never"],
        "comma-dangle": ["error", {
            "arrays": "never",
            "objects": "always-multiline",
        }],
    },
}
