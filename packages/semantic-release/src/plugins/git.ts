export default [
	'@semantic-release/git',
	{
		assets: ['package.json', 'docs', 'README.md'],
		message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
	}
]
