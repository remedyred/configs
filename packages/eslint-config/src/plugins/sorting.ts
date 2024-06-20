import {Linter} from "eslint";
import eslintSortClassMembers from "eslint-plugin-sort-class-members";
import eslintBeautifulSort from "eslint-plugin-beautiful-sort";
import eslintAnnotation from "eslint-plugin-annotation";
import {makeConfig} from "@/helpers";

export const base = makeConfig({
	plugins: {
		"sort-class-members": eslintSortClassMembers,
		"beautiful-sort": eslintBeautifulSort,
		"annotation": eslintAnnotation
	}
})

export const rules: Partial<Linter.RulesRecord> = {
	'sort-class-members/sort-class-members': [
		2,
		{
			order: [
				'[static-properties]',
				'[properties]',
				'[conventional-private-properties]',
				'constructor',
				'[getters]',
				'[setters]',
				'[accessor-pairs]',
				'[static-methods]',
				'[methods]',
				'[async-methods]',
				'[conventional-private-methods]',
				'[everything-else]'
			],
			accessorPairPositioning: 'getThenSet',
			stopAfterFirstProblem: false
		}
	],
	'beautiful-sort/import': [
		'error',
		{
			order: [
				'obj',
				'defaultObj',
				'namespace',
				'default',
				'special',
				'none'
			]
		}
	],
	'sort-annotation/sort-keys': 'error',
	'sort-annotation/sort': 'error'
}

export const config = makeConfig({
	...base,
	rules
})

export default config
