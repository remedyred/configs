/* eslint-disable object-curly-newline */
import SemanticRelease from 'semantic-release'

const settings: Partial<SemanticRelease.GlobalConfig> = {
	branches: ['+([0-9])?(.{+([0-9]),x}).x', 'main', 'next']
}

export = settings
