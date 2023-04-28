import SemanticRelease from 'semantic-release'
import settings from './settings'
import plugins from './plugins'

const config: Partial<SemanticRelease.GlobalConfig> = {...settings, plugins}

export = config
