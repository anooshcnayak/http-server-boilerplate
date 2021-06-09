module.exports = {
	plugins: [
		"@typescript-eslint",
		"eslint-comments",
		"promise",
		"unicorn",
		"prettier"
	],
	parser: `@typescript-eslint/parser`,
	parserOptions: {
		project: `./tsconfig.json`
	},
	extends: [
		'airbnb-typescript/base',
		"plugin:@typescript-eslint/recommended",
		"plugin:eslint-comments/recommended",
		"plugin:promise/recommended",
		"plugin:unicorn/recommended",
		"plugin:prettier/recommended",
	],
	env: {
		node: true
	},
	rules: {
		"@typescript-eslint/no-var-requires": 0,
		"unicorn/prefer-module": 0,
		"@typescript-eslint/no-explicit-any": 0,
		// Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
		"no-prototype-builtins": "off",
		// https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
		"import/prefer-default-export": "off",
		"unicorn/filename-case": "off",
		// Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
		"no-use-before-define": [
			"error",
			{ functions: false, classes: true, variables: true },
		],
		"@typescript-eslint/lines-between-class-members": "off",
		// Makes no sense to allow type inferrence for expression parameters, but require typing the response
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{ allowExpressions: true, allowTypedFunctionExpressions: true },
		],
		"@typescript-eslint/no-use-before-define": [
			"error",
			{ functions: false, classes: true, variables: true, typedefs: true },
		],
	},
}
