import {$out, Config, SubConfig} from '../common'
import {ParsedArgs} from '@snickbit/node-cli'
import {isEmpty, objectExcept, objectPull, objectSort} from '@snickbit/utilities'
import {getFileJson, saveFileJson} from '@snickbit/node-utilities'
import {validateConfig} from 'renovate/dist/config/validation'
import {mergeChildConfig} from 'renovate/dist/config/utils'
import {RenovateConfig} from 'renovate/dist/config/types'
import {unixify} from 'fast-glob/out/utils/path'
import fg from 'fast-glob'
import path from 'path'

export default async function build(args: ParsedArgs, config: Config) {
	$out.block
		.heading('builder')
		.info(`Building renovate config`)

	return generateFromDefinitionFiles(config)
}

export async function generateFromDefinitionFiles(config: Config): Promise<void> {
	await fromDefinitionFiles('generate', config)
}

export async function buildFromDefinitionFiles(config: Config): Promise<RenovateConfig[]> {
	return fromDefinitionFiles('build', config)
}

async function fromDefinitionFiles(action: 'build' | 'generate', config: Config): Promise<RenovateConfig[]> {
	const definitionFiles = await fg(`${config.source}/*.json`, {absolute: true})

	const promises = []
	for (const definitionFile of definitionFiles) {
		promises.push(action === 'build'
			? buildFromDefinitionFile(definitionFile)
			: generateFromDefinitionFile(definitionFile, config))
	}

	return Promise.all(promises)
}

async function generateFromDefinitionFile(source: string, config: Config): Promise<void> {
	const renovateConfig: RenovateConfig = await buildFromDefinitionFile(source)
	if (!isEmpty(renovateConfig)) {
		let output = `${config?.output || config?.cwd || process.cwd()}/${path.basename(source)}`
		if (!output.endsWith('.json')) {
			output += '.json'
		}
		saveFileJson(output, renovateConfig)
	}
}

export async function buildFromDefinitionFile(source: string): Promise<RenovateConfig> {
	const definition = getFileJson(source)

	const definitionConfig: SubConfig = {
		source,
		fileSources: objectPull(definition, 'extends') || [],
		cwd: path.dirname(source)
	}

	let results: RenovateConfig = {}
	if (definitionConfig.fileSources.length) {
		results = await buildFromDefinition(definitionConfig)
	}
	return results
}

export function cleanSource(fileSource: string, cwd?: string): string {
	let cleanSource = unixify(fileSource).replace(/^\.\//, '').replace(/\/\*$/, '/**/*')
	if (cwd) {
		cleanSource = path.posix.join(cwd, cleanSource)
	}
	if (!cleanSource.endsWith('.json')) {
		cleanSource += '.json'
	}
	return cleanSource
}

export async function buildFromDefinition(config: SubConfig): Promise<RenovateConfig> {
	let combinedFiles: Record<string, unknown> = {}
	const extensions: string[] = []
	const fileSources: string[] = []

	for (const fileSource of config.fileSources) {
		if (fileSource.startsWith('./')) {
			fileSources.push(cleanSource(fileSource, config.cwd))
		} else {
			extensions.push(fileSource)
		}
	}

	const files = await fg(fileSources, {absolute: true})

	for (const file of files) {
		const json: RenovateConfig = getFileJson(file)
		const dirname = path.basename(path.dirname(file))
		const basename = path.basename(file)
		if (json) {
			$out.debug(`adding file ${dirname}/${basename}`)
			if (json.extends) {
				extensions.push(...json.extends)
			}
			combinedFiles = mergeChildConfig(combinedFiles, json)
		}
	}

	combinedFiles = objectSort(objectExcept(combinedFiles, ['extends', '$schema']))

	const results: RenovateConfig = {
		$schema: 'https://docs.renovatebot.com/renovate-schema.json',
		extends: extensions,
		...combinedFiles
	}

	await validate(results)

	return results
}

export async function validate(results: any) {
	const validation = await validateConfig(results, true)

	if (validation.errors.length > 0) {
		$out.fatal('RENOVATE ERROR:', ...validation.errors)
	} else if (validation.warnings.length > 0) {
		$out.warn('RENOVATE WARNING:', ...validation.warnings)
	} else {
		$out.debug('Valid config!')
	}
}
