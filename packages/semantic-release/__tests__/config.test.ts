import configTS from '../src'
import configCJS from '../dist'

describe.each([ ['ts', configTS], ['cjs', configCJS] ])('config %s', (label, config) => {
	it('should be an object', () => {
		expect(config).toBeInstanceOf(Object)
	})

	it('should have a branches that contain main and next', () => {
		expect(config.branches).toEqual(expect.arrayContaining(['main', 'next']))
	})

	describe('plugins', () => {
		it('should be an array', () => {
			expect(config.plugins).toBeInstanceOf(Array)
		})

		describe.each(config.plugins)('plugin %s', plugin => {
			if (Array.isArray(plugin)) {
				it('array configs should be a string and a config object', () => {
					const [pkg, config] = plugin
					expect(pkg).toEqual(expect.stringContaining('semantic'))
					expect(config).toEqual(expect.any(Object))
				})
			} else {
				it('string plugins should be a string containing "semantic"', () => {
					expect(plugin).toEqual(expect.stringContaining('semantic'))
				})
			}
		})
	})

	it('should have a plugin where the first element is "@semantic-release/npm" and the second element is {tarballDir: "pack"}', () => {
		expect(config.plugins).toContainEqual(['@semantic-release/npm', {tarballDir: 'pack'} ])
	})
})
