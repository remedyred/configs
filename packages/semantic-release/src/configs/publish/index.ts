import {GlobalConfig} from 'semantic-release'
import settings from '../common/settings'
import plugins from './plugins'

const config: Partial<GlobalConfig> = {...settings, plugins}

export = config
