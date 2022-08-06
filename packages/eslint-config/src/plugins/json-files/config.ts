export = {
	plugins: [
		"json-files"
	],
	overrides: [
		{
			files: [
				"*.json"
			],
			parser: "espree"
		}
	]
}
