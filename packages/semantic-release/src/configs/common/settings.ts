/* eslint-disable object-curly-newline */
import {GlobalConfig} from 'semantic-release'

const settings: Partial<GlobalConfig> = {
	branches: ['+([0-9])?(.{+([0-9]),x}).x', 'main', 'next']
}

export = settings
