export = {
	extends: ['plugin:jsonc/recommended-with-jsonc'],
	plugins: ['json-files'],
	overrides: [
		{
			files: [
				'*.json',
				'*.json5',
				'*.jsonc'
			],
			parser: 'jsonc-eslint-parser'
		}
	]
}
