import eslintJest from 'eslint-plugin-jest'
import {Linter} from "eslint";
import {makeConfig} from "@/helpers.ts";

const eslintJestRecommended = eslintJest.configs['flat/recommended']
const eslintJestStyle = eslintJest.configs['flat/style']

export const base = makeConfig(
		eslintJestRecommended,
		eslintJestStyle,
		{
			files: ['*.test.ts', '*.spec.ts', '__tests__/**/*'],
		}
)

export const rules: Partial<Linter.RulesRecord> = {
	...eslintJestRecommended.rules,
	...eslintJestStyle.rules,
	'@typescript-eslint/unbound-method': 'off',
	'jest/unbound-method': 'error',
	'jest/consistent-test-it': 'error',
	'jest/no-disabled-tests': 'warn',
	'jest/max-nested-describe': 'warn',
	'jest/prefer-called-with': 'warn',
	'jest/no-duplicate-hooks': 'warn',
	'jest/prefer-equality-matcher': 'warn',
	'jest/prefer-expect-resolves': 'warn',
	'jest/prefer-hooks-in-order': 'warn',
	'jest/prefer-comparison-matcher': 'warn',
	'jest/prefer-spy-on': 'warn',
	'jest/prefer-strict-equal': 'warn',
	'jest/prefer-mock-promise-shorthand': 'warn'
}

export const config = makeConfig({
	...base,
	rules
})

export default config
