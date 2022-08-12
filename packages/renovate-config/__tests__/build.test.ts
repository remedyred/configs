import {buildFromDefinitionFile} from '../src/actions/build'
import {validateConfig} from 'renovate/dist/config/validation'

const VALID_CONFIG = {errors: [], warnings: []}

describe('build.ts', () => {
	describe('buildFromDefinitionFile', () => {
		it('should return a valid config', async () => {
			const config = await buildFromDefinitionFile('config/default.json')
			expect(validateConfig(config)).resolves.toMatchObject(VALID_CONFIG)
		})

		it('should return a config with more than 2 keys', async () => {
			const config = await buildFromDefinitionFile('config/default.json')
			expect(Object.keys(config).length).toBeGreaterThan(2)
		})

		it('should return a config with an extends key with a length greater than 0', async () => {
			const config = await buildFromDefinitionFile('config/default.json')
			expect(config.extends.length).toBeGreaterThan(0)
		})

		it('should reliably return a valid config', async () => {
			expect(await buildFromDefinitionFile('config/default.json')).toMatchSnapshot()
		})

		it('should have an automerge property with a value of true', async () => {
			const config = await buildFromDefinitionFile('config/default.json')
			expect(config.automerge).toBe(true)
		})
	})
})
