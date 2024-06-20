import {ESLint, Linter} from "eslint";
import path from "path";
import fg from "fast-glob";
import {fileExists} from "@snickbit/node-utilities";
import {__filename} from "@/helpers.ts";

export const __src = path.dirname(__filename)
export const __root = path.join(__src, '..')

export const flipSlashes = (str: string) => str.replace(/\\/g, '/')

export const CONFIG_PATH = path.join(__root, 'dist', 'configs')
export const MOCK_FILES_PATH = flipSlashes(path.join(__root, '__fixtures__'))

export const MOCK_FILES = fg.sync('**/*', {cwd: MOCK_FILES_PATH, ignore: ['.eslintrc.json', 'tsconfig.json']})

export const FIXTURE_FILE_TYPES = [
	'ts',
	'js',
	'json',
	'yml'
]
export const regexp = new RegExp(`bad\\.(${FIXTURE_FILE_TYPES.join('|')})$`)

export const DEPRECATED_RULES = {
	'vue/component-tags-order': ['block-order'],
	'array-bracket-newline': [],
	'array-bracket-spacing': [],
	'array-element-newline': [],
	'arrow-parens': [],
	'arrow-spacing': [],
	'comma-style': [],
	'computed-property-spacing': [],
	'dot-location': [],
	'eol-last': [],
	'function-call-argument-newline': [],
	'function-paren-newline': [],
	'generator-star-spacing': [],
	'implicit-arrow-linebreak': [],
	indent: [],
	'key-spacing': [],
	'linebreak-style': [],
	'lines-around-comment': [],
	'max-len': [],
	'no-multi-spaces': [],
	'no-multiple-empty-lines': [],
	'no-trailing-spaces': [],
	'no-whitespace-before-property': [],
	'nonblock-statement-body-position': [],
	'object-curly-newline': [],
	'operator-linebreak': [],
	'padded-blocks': [],
	'quote-props': [],
	'rest-spread-spacing': [],
	'semi-spacing': [],
	'semi-style': [],
	'space-in-parens': [],
	'space-unary-ops': [],
	'spaced-comment': [],
	'switch-colon-spacing': [],
	'template-curly-spacing': [],
	'template-tag-spacing': [],
	'yield-star-spacing': [],
	'@typescript-eslint/object-curly-spacing': [],
	'no-mixed-spaces-and-tabs': []
}

export function getOptions(config?: Linter.Config | string): ESLint.Options {
	const options: ESLint.Options = {
		cwd: MOCK_FILES_PATH,
		cache: false,
		ignore: false
	}

	if (config) {
		if (typeof config === 'string') {
			if (config.endsWith('.js') && fileExists(config)) {
				options.overrideConfigFile = config
			} else if (fileExists(`${config}.js`)) {
				options.overrideConfigFile = `${config}.js`
			}
		} else {
			options.overrideConfig = config
		}
	}

	if (!options.overrideConfig && !options.overrideConfigFile) {
		options.overrideConfigFile = `${CONFIG_PATH}/all.js`
	}

	return options;
}

export class MockLint {
	eslint: ESLint

	constructor(config?: Linter.Config | string) {
		this.eslint = new ESLint(getOptions(config))
	}

	async getConfig(file: string): Promise<Linter.Config> {
		return this.eslint.calculateConfigForFile(file)
	}

	async lintFile(file: string): Promise<ESLint.LintResult[]> {
		return this.eslint.lintFiles([file])
	}
}
