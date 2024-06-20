import eslintVue from 'eslint-plugin-vue';
import {Linter} from "eslint";
import {makeConfig} from "@/helpers";

export const base = makeConfig(eslintVue.configs['flat/recommended'])

export const rules: Partial<Linter.RulesRecord> = {
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
	'vue/no-static-inline-styles': ['error', {allowBinding: true}],
	'vue/require-default-prop': 'off'
}

export const config = makeConfig({
	...base,
	rules
})

export default config
