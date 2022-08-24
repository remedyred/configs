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

		it('should be an array of arrays or strings', () => {
			for (const plugin of config.plugins) {
				const type = Array.isArray(plugin)
					? 'array'
					: typeof plugin
				expect(['string', 'array']).toContain(type)
			}
		})

		it('array configs, first element should be a string', () => {
			for (const plugin of config.plugins) {
				if (Array.isArray(plugin)) {
					const first = plugin[0]
					expect(typeof first).toBe('string')
				}
			}
		})
	})

	it('should have a plugin where the first element is "@semantic-release/npm" and the second element is {tarballDir: "pack"}', () => {
		expect(config.plugins).toContainEqual(['@semantic-release/npm', {tarballDir: 'pack'} ])
	})
})
