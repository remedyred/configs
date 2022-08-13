import {ESLint} from 'eslint'
import {unixify} from 'fast-glob/out/utils/path'
import fg from 'fast-glob'
import eslintConfig from '../src/configs'
import vueConfig from '../src/configs/vue'
import path from 'path'

export async function testFile(fileToTest: string) {
	const ext = path.extname(fileToTest)
	const baseConfig = ext === '.vue' ? vueConfig : eslintConfig

	// 1. Create an instance.
	const eslint = new ESLint({
		baseConfig,
		useEslintrc: false,
		cache: false
	})

	// 2. Lint files.
	const results = await eslint.lintFiles([fileToTest])

	// 3. Report results.
	return results.pop()
}

const MOCK_FILES_PATH = `${unixify(__dirname)}/../__fixtures__`
const MOCK_FILES = fg.sync('**/*', {cwd: MOCK_FILES_PATH})

describe('Validate ESLint configs', () => {
	it.each(MOCK_FILES)('should pass ESLint for %s', file => {
		expect(() => {
			expect(testFile(file)).resolves.toBeUndefined()
		}).not.toThrow()
	})
})
