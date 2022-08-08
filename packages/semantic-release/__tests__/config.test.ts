import config from '../src'

describe('config', () => {
	it('should be an object', () => {
		expect(config).toBeInstanceOf(Object)
	})

	it('should have a branches property equalling ["main"]', () => {
		expect(config.branches).toStrictEqual(['main'])
	})

	it('should have an plugins property that is an array', () => {
		expect(config.plugins).toBeInstanceOf(Array)
	})

	it('should have a plugin where the first element is "@semantic-release/commit-analyzer" and the second element is {preset: "conventionalcommits"}', () => {
		expect(config.plugins).toContainEqual(['@semantic-release/commit-analyzer', {preset: 'conventionalcommits'}])
	})
})
