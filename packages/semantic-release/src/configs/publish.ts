import SemanticRelease, {PluginSpec} from 'semantic-release'
import * as common from './common'

export const settings: Partial<SemanticRelease.GlobalConfig> = {
	...common.settings
}

export const plugins: ReadonlyArray<PluginSpec> = [
	...common.plugins.filter(plugin => plugin[0] !== '@semantic-release/git'),
	[
		'@semantic-release/git',
		{
			assets: ['package.json', 'docs', 'README.md'],
			message: 'chore(release): publish <%= nextRelease.gitTag.replace(/(.*?)-v(\\d+[.]\\d+[.]\\d+)/, "$1 v$2") %> [skip ci]\n\n<%= nextRelease.notes %>'
		}
	],
	['@semantic-release/npm', {tarballDir: 'pack'} ],
	[
		'@semantic-release/github',
		{
			assets: 'pack/*.tgz',
			successComment: false
		}
	]
]

const config: Partial<SemanticRelease.GlobalConfig> = {...settings, plugins}

export default config
