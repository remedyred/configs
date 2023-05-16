import {PluginSpec} from 'semantic-release'
import commonPlugins from '../common/plugins'

const plugins: ReadonlyArray<PluginSpec> = [
	...commonPlugins.filter(plugin => plugin[0] !== '@semantic-release/git'),
	['@semantic-release/npm', {tarballDir: 'pack'} ],
	[
		'@semantic-release/git',
		{
			assets: ['package.json', 'docs', 'README.md'],
			message: 'chore(release): publish <%= nextRelease.gitTag.replace(/(.*?)-v(\\d+[.]\\d+[.]\\d+)/, "$1 v$2") %> [skip ci]\n\n<%= nextRelease.notes %>'
		}
	],
	[
		'@semantic-release/github',
		{
			assets: 'pack/*.tgz',
			successComment: false
		}
	]
]

export = plugins
