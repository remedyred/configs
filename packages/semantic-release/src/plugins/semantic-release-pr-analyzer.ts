export default [
	'semantic-release-pr-analyzer',
	{
		strategy: 'github',
		commitAnalyzerConfig: {preset: 'conventionalcommits'},
		notesGeneratorConfig: {preset: 'conventionalcommits'}
	}
]
