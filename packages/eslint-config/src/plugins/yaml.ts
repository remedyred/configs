import eslintYml from 'eslint-plugin-yml';
import {Linter} from "eslint";
import {makeConfig} from "@/helpers";

export const base = makeConfig(...eslintYml.configs['flat/standard'])

export const rules: Partial<Linter.RulesRecord> = {
	'yml/no-multiple-empty-lines': [
		'error',
		{
			max: 1
		}
	]
}

export const config = makeConfig({
	...base,
	rules
})

export default config
