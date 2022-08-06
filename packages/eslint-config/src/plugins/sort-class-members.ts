export default {
	"extends": [
		"../base"
	],
	"plugins": [
		"sort-class-members",
	],
	"rules": {
		"sort-class-members/sort-class-members": [
			2,
			{
				"order": [
					"[static-properties]",
					"[properties]",
					"[conventional-private-properties]",
					"constructor",
					"[getters]",
					"[setters]",
					"[accessor-pairs]",
					"[static-methods]",
					"[methods]",
					"[async-methods]",
					"[conventional-private-methods]",
					"[everything-else]"
				],
				"accessorPairPositioning": "getThenSet",
				"stopAfterFirstProblem": false
			}
		]
	}
}
