import eslintJSONFiles from 'eslint-plugin-json-files';
import eslintJSONC from 'eslint-plugin-jsonc';
import {Linter} from "eslint";
import {makeConfig} from "@/helpers";

const eslintJSONCRecommended = makeConfig(...eslintJSONC.configs["flat/recommended-with-jsonc"])
export const base = makeConfig(
		eslintJSONCRecommended,
		{
			plugins: {
				"json-files": eslintJSONFiles
			}
		}
)

export const rules: Partial<Linter.RulesRecord> = {
	...eslintJSONCRecommended.rules,
	'json-files/require-unique-dependency-names': 'error',
	'json-files/sort-package-json': 'error',
	'jsonc/auto': 'error'
}

export const config = makeConfig({
	...base,
	rules
})

export default config
