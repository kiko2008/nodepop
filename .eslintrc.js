module.exports = {
    "env": {
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {
        "indent": [
            "error",
            "tab"
		],
		// si trabajamos en windos hay que comentar esta regla
        /*"linebreak-style": [
            "error",
            "unix"
        ],*/        
        "semi": [
            "error",
            "always"
        ],
		"translate_tabs_to_spaces": true,
		"no-console": 0
    }
};