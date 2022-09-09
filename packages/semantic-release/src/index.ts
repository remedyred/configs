import SemanticRelease from 'semantic-release'

const config: Partial<SemanticRelease.GlobalConfig> = {
	extends: ['semantic-release-monorepo'],
	branches: [
		'+([0-9])?(.{+([0-9]),x}).x',
		'main',
		'next',
		'next-major',
		{name: 'beta', prerelease: true},
		{name: 'alpha', prerelease: true}
	],
	plugins: [
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
		['@semantic-release/npm', {tarballDir: 'pack'} ],
		[
			'@semantic-release/git',
			{
				assets: ['package.json', 'docs', 'README.md'],
				message: 'chore(release): publish <%= nextRelease.gitTag.replace(/(.*?)-v(\\d+[.]\\d+[.]\\d+)/, "$1 v$2") %> [skip ci]\n\n<%= nextRelease.notes %>'
			}
		],
		['@semantic-release/github', {assets: 'pack/*.tgz'} ]
	]
}

export = config
