export = {
	env: {es2022: true},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: 'tsconfig.json'
	},
	extends: ['plugin:unicorn/recommended']

}
