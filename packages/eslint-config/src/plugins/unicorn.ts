import eslintUnicorn from 'eslint-plugin-unicorn'
import {Linter} from "eslint";
import {makeConfig} from "@/helpers";

export const base = makeConfig(eslintUnicorn.configs['flat/recommended'])

export const rules: Partial<Linter.RulesRecord> = {
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

export const config = makeConfig({
	...base,
	rules
})

export default config
