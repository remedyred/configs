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
const MOCK_FILES = fg.sync('**/*', {cwd: MOCK_FILES_PATH, ignore: ['.eslintrc.json']})

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

		it('should pass ESLint', async () => {
			expect(linter).toBeInstanceOf(MockLint)
		})

		it('should return the proper config', async () => {
			expect(linter.getConfig(file)).resolves.toMatchSnapshot()
		})

		it('should return the proper lint results', async () => {
			expect(linter.lintFile(file)).resolves.toMatchSnapshot()
		})
	})
})
