export default {
	"extends": [
		"../base"
	],
	"plugins": [
		"json-files"
	],
	"overrides": [
		{
			"files": [
				"*.json"
			],
			"parser": "espree"
		}
	],
	"rules": {
		"json-files/require-unique-dependency-names": "error",
		"json-files/sort-package-json": "error",
	}
}
