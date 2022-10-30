import {PluginSpec} from 'semantic-release'

const plugins: ReadonlyArray<PluginSpec> = [
	[
		'@semantic-release/changelog',
		{
			changelogTitle: `# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.`
		}
	],
	[
		'@semantic-release/commit-analyzer',
		{
			preset: 'conventionalcommits',
			config: {
				mergePattern: /^Merge pull request #(\d+) from (.*)$/,
				mergeCorrespondence: ['id', 'source']
			},
			releaseRules: [
				{type: 'docs', scope: 'README', release: false},
				{type: 'test', release: false},
				{type: 'style', release: false},
				{type: 'refactor', scope: '*', release: 'minor'},
				{type: 'refactor', release: 'patch'},
				{type: 'feat', release: 'minor'},
				{type: 'fix', release: 'patch'},
				{type: 'chore', release: 'patch'},
				{type: 'perf', release: 'patch'},
				{scope: 'breaking', release: 'major'},
				{scope: 'no-release', release: false}
			]
		}
	],
	['@semantic-release/release-notes-generator', {preset: 'conventionalcommits'} ],
	[
		'@semantic-release/git',
		{
			assets: ['package.json', 'docs', 'README.md'],
			message: 'chore(release): release <%= nextRelease.gitTag.replace(/(.*?)-v(\\d+[.]\\d+[.]\\d+)/, "$1 v$2") %> [skip ci]\n\n<%= nextRelease.notes %>'
		}
	]
]

export = plugins
