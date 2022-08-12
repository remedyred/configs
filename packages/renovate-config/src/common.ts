import {Out} from '@snickbit/out'

export const $out = new Out('build')

export interface Config {

	/** Required **/
	source: string
	output: string

	/** Optional **/
	cwd?: string
}

export interface SubConfig extends Omit<Config, 'output'> {
	output?: string
	fileSources: string[]
}

export const defaultConfig: Config = {
	source: `config`,
	output: `.`
}
