import config from '../dist'

describe('config-compiled', () => {
	it('should be an object', () => {
		expect(config).toBeInstanceOf(Object)
	})

	it('should have a branches property equalling ["main", "next"]', () => {
		expect(config.branches).toStrictEqual(['main', 'next'])
	})

	describe('plugins', () => {
		it('should be an array', () => {
			expect(config.plugins).toBeInstanceOf(Array)
		})

		it('should be an array of arrays or strings', () => {
			for (const plugin of config.plugins) {
				const type = Array.isArray(plugin) ? 'array' : typeof plugin
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

	it('should have a plugin where the first element is "@semantic-release/commit-analyzer" and the second element is {preset: "conventionalcommits"}', () => {
		expect(config.plugins).toContainEqual(['@semantic-release/commit-analyzer', {preset: 'conventionalcommits'} ])
	})
})
