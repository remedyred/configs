export default {
	"extends": [
		"../base",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint",
	],
	"rules": {
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/brace-style": [
			"error",
			"1tbs"
		],
		"@typescript-eslint/comma-dangle": [
			"error",
			"never"
		],
		"@typescript-eslint/comma-spacing": [
			"error",
			{
				"before": false,
				"after": true
			}
		],
		"@typescript-eslint/type-annotation-spacing": "error",
		"@typescript-eslint/sort-type-union-intersection-members": "error",
		"@typescript-eslint/prefer-ts-expect-error": "warn",
		"@typescript-eslint/method-signature-style": ["warn", "method"],
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				"multiline": {
					"delimiter": "none",
					"requireLast": true
				},
				"singleline": {
					"delimiter": "semi",
					"requireLast": false
				},
				"multilineDetection": "brackets"
			}
		],
		"@typescript-eslint/func-call-spacing": "error",
		"@typescript-eslint/keyword-spacing": "error",
		"@typescript-eslint/lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
		"@typescript-eslint/no-extra-parens": [
			"error"
		],
		"@typescript-eslint/object-curly-spacing": [
			"error",
			"never"
		],
		"@typescript-eslint/quotes": [
			"error",
			"single",
			{
				"allowTemplateLiterals": true,
				"avoidEscape": true
			}
		],
		"@typescript-eslint/semi": [
			"error",
			"never"
		],
		"@typescript-eslint/space-before-blocks": "error",
		"@typescript-eslint/space-before-function-paren": [
			"error",
			{
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}
		],
		"@typescript-eslint/space-infix-ops": "error"
	}
}
