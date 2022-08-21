export = {
	rules: {
		'vue/html-closing-bracket-spacing': 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: {max: 4},
				multiline: {max: 1}
			}
		],
		'vue/no-setup-props-destructure': 'off',
		'vue/no-static-inline-styles': ['error', {allowBinding: true} ],
		'vue/require-default-prop': 'off'
	}
}
