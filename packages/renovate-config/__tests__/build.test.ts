import {buildFromDefinitionFile} from '../src/actions/build'
import {validateConfig} from 'renovate/dist/config/validation'
import * as fs from 'fs'
import unixify from 'unixify'
import path from 'path'

const VALID_CONFIG = {errors: [], warnings: []}

const CONFIG_FILE = unixify(path.join(__dirname, '..', 'config', 'dev.json')) // 'config/dev.json'

describe('build.ts', () => {
	it(`config file should exist at ${CONFIG_FILE}`, () => {
		expect(fs.existsSync(CONFIG_FILE)).toBe(true)
	})

	describe('buildFromDefinitionFile', () => {
		it('should return a valid config', async () => {
			const config = await buildFromDefinitionFile(CONFIG_FILE)
			expect(validateConfig(config)).resolves.toMatchObject(VALID_CONFIG)
		})

		it('should return a config with more than 2 keys', async () => {
			const config = await buildFromDefinitionFile(CONFIG_FILE)
			expect(Object.keys(config).length).toBeGreaterThan(2)
		})

		it('should return a config with an extends key with a length greater than 0', async () => {
			const config = await buildFromDefinitionFile(CONFIG_FILE)
			expect(config.extends.length).toBeGreaterThan(0)
		})

		it('should reliably return a valid config', async () => {
			expect(await buildFromDefinitionFile(CONFIG_FILE)).toMatchSnapshot()
		})
	})
})
