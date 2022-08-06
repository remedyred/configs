export default {
	"extends": [
		"../base"
	],
	"plugins": [
		"beautiful-sort"
	],
	"rules": {
		"beautiful-sort/import": [
			"error",
			{
				"order": [
					"obj",
					"defaultObj",
					"namespace",
					"default",
					"special",
					"none"
				]
			}
		]
	}
}
