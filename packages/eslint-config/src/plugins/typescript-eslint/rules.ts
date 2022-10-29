import eslintRules from '../eslint/rules'

export = {
	rules: {
		...eslintRules.rules,
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/brace-style': ['error', '1tbs'],
		'@typescript-eslint/comma-dangle': ['error', 'never'],
		'@typescript-eslint/comma-spacing': [
			'error',
			{
				after: true,
				before: false
			}
		],
		'@typescript-eslint/consistent-generic-constructors': 'warn',
		'@typescript-eslint/func-call-spacing': 'error',
		'@typescript-eslint/keyword-spacing': 'error',
		'@typescript-eslint/lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true} ],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'none',
					requireLast: true
				},
				multilineDetection: 'brackets',
				singleline: {
					delimiter: 'semi',
					requireLast: false
				}
			}
		],
		'@typescript-eslint/method-signature-style': ['warn', 'method'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-extra-parens': 'off',
		'@typescript-eslint/object-curly-spacing': ['error', 'never'],
		'@typescript-eslint/prefer-ts-expect-error': 'warn',
		'@typescript-eslint/quotes': [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
				avoidEscape: true
			}
		],
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/sort-type-union-intersection-members': 'error',
		'@typescript-eslint/space-before-blocks': 'error',
		'@typescript-eslint/space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				asyncArrow: 'always',
				named: 'never'
			}
		],
		'@typescript-eslint/space-infix-ops': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error'
	}
}
