export = {
	rules: {
		'unicorn/prefer-top-level-await': 'off',
		'unicorn/explicit-length-check': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/no-null': 'off',
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/filename-case': [
			'error',
			{
				cases: {
					kebabCase: true,
					pascalCase: true
				}
			}
		]
	}
}
