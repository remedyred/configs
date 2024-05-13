import {ESLint, Linter} from 'eslint'
import {fileExists} from '@snickbit/node-utilities'
import {unixify} from 'fast-glob/out/utils/path'
import fg from 'fast-glob'
import path from 'path'

const CONFIG_PATH = path.join(__dirname, '..', 'dist', 'configs')
if (!fileExists(CONFIG_PATH)) {
	throw new Error(`Config path ${CONFIG_PATH} does not exist. Did you forget to run "pnpm build"?`)
}

const MOCK_FILES_PATH = `${unixify(__dirname)}/../__fixtures__`
const MOCK_FILES = fg.sync('**/*', {cwd: MOCK_FILES_PATH, ignore: ['.eslintrc.json', 'tsconfig.json']})
const FIXTURE_FILE_TYPES = [
	'ts',
	'js',
	'json',
	'yml'
]
const regexp = new RegExp(`bad\\.(${FIXTURE_FILE_TYPES.join('|')})$`)
const DEPRECATED_RULES = {
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

export class MockLint {
	eslint: ESLint

	constructor(config?: Linter.Config | string) {
		this.setConfig(config)
	}

	setConfig(config?: Linter.Config | string) {
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

		this.eslint = new ESLint(options)
	}

	async getConfig(file: string): Promise<Linter.Config> {
		return this.eslint.calculateConfigForFile(file)
	}

	async lintFile(file: string): Promise<ESLint.LintResult[]> {
		return this.eslint.lintFiles([file])
	}

	async lintText(text: string, file: string): Promise<ESLint.LintResult[]> {
		return this.eslint.lintText(text, {filePath: file})
	}
}

describe('Validate ESLint configs', () => {
	describe.each(MOCK_FILES)('.add(Validate ESLint configs for %s)', file => {
		const linter = new MockLint(CONFIG_PATH)

		const DEPRECATED_RULES_ARRAY = Object.entries(DEPRECATED_RULES)
			.filter((([rule]) => file !== 'bad.yml' || rule !== 'spaced-comment'))
			.map(([ruleId, replacedBy]) => ({
				ruleId,
				replacedBy
			}))

		it('should pass ESLint', async () => {
			expect(linter).toBeInstanceOf(MockLint)
		})

		it('should return the proper config', async () => {
			const parsedConfig = await linter.getConfig(file)
			const PARSERS = [
				'vue-eslint-parser@',
				'espree@',
				'jsonc-eslint-parser',
				'yaml-eslint-parser@'
			]
			const PARSERS_MATCH = PARSERS.join('|')
			const regexp = new RegExp(`(${PARSERS_MATCH})`)
			expect(parsedConfig).toMatchSnapshot({parser: expect.stringMatching(regexp)})
		})

		describe('lint results', () => {
			let lintResults: ESLint.LintResult[]
			let filePath: string, usedDeprecatedRules: ESLint.DeprecatedRuleUse[]

			beforeEach(async () => {
				lintResults = await linter.lintFile(file);
				({filePath, usedDeprecatedRules} = lintResults.at(0))
			})

			it('should return the proper filepath', async () => {
				console.log({usedDeprecatedRules})
				expect(filePath).toMatch(regexp)
			})

			it('should check each deprecated rule', () => {
				expect(usedDeprecatedRules).toStrictEqual(DEPRECATED_RULES_ARRAY)
			})
		})
	})
})
