import * as pluginConfigs from './plugins'
import SemanticRelease from 'semantic-release'

const plugins: SemanticRelease.PluginSpec[] = []

for (const plugin of Object.values(pluginConfigs)) {
	plugins.push(plugin as SemanticRelease.PluginSpec)
}

const config: Partial<SemanticRelease.GlobalConfig> = {
	branches: ['main', 'next'],
	plugins
}

export = config
