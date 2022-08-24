import plugins from './plugins'
import SemanticRelease from 'semantic-release'

const config: Partial<SemanticRelease.GlobalConfig> = {
	branches: [
		'+([0-9])?(.{+([0-9]),x}).x',
		'main',
		'next',
		'next-major',
		{name: 'beta', prerelease: true},
		{name: 'alpha', prerelease: true}
	],
	plugins
}

export = config
