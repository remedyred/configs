export = {
	rules: {
		'array-bracket-newline': ['error', {multiline: true, minItems: 4} ],
		'array-bracket-spacing': ['error', 'never', {arraysInArrays: true, objectsInArrays: true} ],
		'array-element-newline': ['error', {multiline: true, minItems: 4} ],
		'arrow-parens': ['error', 'as-needed'],
		'arrow-spacing': 'error',
		'comma-style': ['error', 'last'],
		'computed-property-spacing': 'error',
		curly: ['error', 'all'],
		'dot-location': ['error', 'property'],
		'eol-last': 'error',
		eqeqeq: 'error',
		'function-call-argument-newline': ['error', 'consistent'],
		'function-paren-newline': ['error', {minItems: 6} ],
		'generator-star-spacing': 'error',
		'implicit-arrow-linebreak': 'error',
		indent: [
			'error',
			'tab',
			{
				MemberExpression: 1,
				SwitchCase: 1
			}
		],
		'key-spacing': 'error',
		'linebreak-style': 'error',
		'lines-around-comment': [
			'error',
			{
				allowBlockStart: true,
				beforeBlockComment: true
			}
		],
		'max-len': [
			'error',
			{
				code: 180, tabWidth: 4,
				comments: 140, ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreRegExpLiterals: true
			}
		],
		'no-else-return': 'error',
		'no-lonely-if': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': ['error', {max: 1} ],
		'no-trailing-spaces': 'error',
		'no-undef-init': 'error',
		'no-unneeded-ternary': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-whitespace-before-property': 'error',
		'nonblock-statement-body-position': ['error', 'below'],
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: {
					multiline: true,
					consistent: true
				},
				ObjectPattern: {
					multiline: true,
					consistent: true
				},
				ImportDeclaration: {
					multiline: true,
					consistent: true,
					minProperties: 10
				},
				ExportDeclaration: {
					multiline: true,
					consistent: true,
					minProperties: 4
				}
			}
		],
		'@ada-support/object-newline/enforce': ['error', {items: 2} ],
		'object-shorthand': ['error', 'always', {avoidExplicitReturnArrows: true} ],
		'operator-linebreak': 'error',
		'padded-blocks': ['warn', 'never'],
		'prefer-arrow-callback': 'error',
		'prefer-const': 'warn',
		'prefer-object-spread': 'error',
		'prefer-template': 'error',
		'quote-props': ['error', 'as-needed'],
		'rest-spread-spacing': 'error',
		'semi-spacing': 'error',
		'semi-style': 'error',
		'space-in-parens': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': ['error', 'always', {markers: ['/']} ],
		'switch-colon-spacing': 'error',
		'template-curly-spacing': 'error',
		'template-tag-spacing': 'error',
		'yield-star-spacing': 'error',
		'logical-assignment-operators': ['error', 'always', {enforceForIfStatements: true} ]
	}
}
