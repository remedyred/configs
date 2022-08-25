/* eslint-disable array-element-newline */
import SemanticRelease from 'semantic-release'

const config: Partial<SemanticRelease.GlobalConfig> = {
	extends: [
		'semantic-release-monorepo',
		'@snickbit/semantic-release'
	]
}

export = config
