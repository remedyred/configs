import {$out, Config, RenovateConfig, SubConfig} from '../common'
import {ParsedArgs} from '@snickbit/node-cli'
import {isArray, isEmpty, objectCopy, objectExcept, objectPull, objectSort} from '@snickbit/utilities'
import {getFileJson, saveFileJson} from '@snickbit/node-utilities'
import {validateConfig} from 'renovate/dist/config/validation'
import {mergeChildConfig} from 'renovate/dist/config/utils'
import unixify from 'unixify'
import fg from 'fast-glob'
import path from 'path'

let definitionLoops = 0
export default async function build(args: ParsedArgs, config: Config) {
	$out.block
		.heading('builder')
		.info(`Building renovate config`)

	const definitionFiles = await fg(`${config.source}/*.json`, {absolute: true})
	definitionLoops = 0
	return Promise.all(definitionFiles.map(definitionFile => generateFromDefinitionFile(definitionFile, config)))
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

export async function buildFromDefinitionFile(source: string, cwd?: string): Promise<RenovateConfig> {
	const definition = getFileJson(source)
	if (!definition) {
		throw new Error(`Definition file not found: ${source}`)
	}

	const definitionConfig: SubConfig = {
		source,
		fileSources: objectPull(definition, 'extends') || [],
		cwd: cwd || path.dirname(source)
	}

	let results: RenovateConfig = {}
	if (definitionConfig.fileSources.length) {
		results = await buildFromSources(definitionConfig)
	}
	return results
}

export function cleanSource(fileSource: string, cwd?: string): string {
	let cleanSource = fileSource

	if (cwd) {
		if (path.isAbsolute(cleanSource)) {
			cleanSource = path.relative(cwd, cleanSource)
		}

		cleanSource = path.posix.join(cwd, cleanSource)
	}

	if (!cleanSource.endsWith('.json')) {
		cleanSource += '.json'
	}

	cleanSource = unixify(cleanSource)
		.replace(/^\.\//, '')
		.replace(/\/\*$/, '/**/*')

	return cleanSource
}

export async function buildFromSources(config: {fileSources: string[]; cwd?: string}): Promise<RenovateConfig> {
	return buildFromDefinitions([ {extends: config.fileSources} ], {cwd: config.cwd})
}

const isRelativeExtend = (extend: string): boolean => extend.startsWith('./') || extend.startsWith('../')

const isRelativeExtendArray = (extendsArray: string[]): boolean => isArray(extendsArray) && extendsArray.some(extend => isRelativeExtend(extend))

export async function buildFromDefinitions(definitions: RenovateConfig[], config: {cwd?: string}): Promise<RenovateConfig | undefined> {
	let combinedFiles: Record<string, unknown> = {}
	const extensions: string[] = []

	const addExtensions = async (sources: string[], cwd?: string) => {
		for (const fileSource of sources) {
			if (isRelativeExtend(fileSource)) {
				const clean_source_paths = cleanSource(fileSource, cwd || config.cwd)
				const files = await fg(clean_source_paths, {cwd: config.cwd})
				if (files.length) {
					definitions.push(...files.map(file => {
						return {
							...getFileJson(file),
							file: unixify(file)
						}
					}))
				} else {
					throw new Error(`No files found for source: ${fileSource} (${clean_source_paths})`)
				}
			} else {
				extensions.push(fileSource)
			}
		}
	}

	while (definitions.length > 0) {
		definitionLoops++
		const definition = definitions.shift()
		const name = definition.file || `definition ${definitionLoops}`
		$out.debug(`Processing definition: ${name}`)
		if (definition) {
			if (definition.extends) {
				await addExtensions(definition.extends, definition.file ? path.dirname(definition.file) : undefined)
			}
			if (
				definition.packageRules &&
				Array.isArray(definition.packageRules) &&
				definition.packageRules.some(rule => isRelativeExtendArray(rule.extends))
			) {
				const packageRules = []
				for (const rule of definition.packageRules) {
					if (isRelativeExtendArray(rule.extends)) {
						const combinedRule = await buildFromDefinitions([rule] as RenovateConfig[], {cwd: definition.file ? path.dirname(definition.file) : config.cwd})
						packageRules.push(combinedRule)
					}
				}
				definition.packageRules = packageRules
			}
			combinedFiles = mergeChildConfig(combinedFiles, definition)
		}
	}

	combinedFiles = objectSort(objectExcept(combinedFiles, ['extends', '$schema', 'file']))

	let results: Partial<RenovateConfig> = {}

	if (isArray(extensions)) {
		results.extends = extensions
	}

	if (!isEmpty(combinedFiles)) {
		results = {...results, ...combinedFiles}
	}

	if (!Object.keys(results).length) {
		return undefined
	}

	// copy the object so it's a clean json object
	return objectCopy({
		$schema: 'https://docs.renovatebot.com/renovate-schema.json',
		...results
	})
}

export async function validate(results: any) {
	const validation = await validateConfig(results, true)

	if (validation.errors.length > 0) {
		$out.error('RENOVATE ERROR:', ...validation.errors)
	} else if (validation.warnings.length > 0) {
		$out.warn('RENOVATE WARNING:', ...validation.warnings)
	} else {
		$out.debug('Valid config!')
	}
}
