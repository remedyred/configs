import {ESLint} from 'eslint'
import {fileExists} from '@snickbit/node-utilities'
import {CONFIG_PATH, DEPRECATED_RULES, MOCK_FILES, MockLint, regexp} from "@/test-helpers";

if (!fileExists(CONFIG_PATH)) {
	throw new Error(`Config path ${CONFIG_PATH} does not exist. Did you forget to run "pnpm build"?`)
}

describe('Validate ESLint configs', () => {
	describe.each(MOCK_FILES)('.add(Validate ESLint configs for %s)', file => {
		const linter = new MockLint(CONFIG_PATH)
		console.log({linter})

		const DEPRECATED_RULES_ARRAY = Object.entries(DEPRECATED_RULES)
			.filter((([rule]) => file !== 'bad.yml' || rule !== 'spaced-comment'))
			.map(([ruleId, replacedBy]) => ({
				ruleId,
				replacedBy
			}))

		it('should pass ESLint', async () => {
			expect(linter).toBeInstanceOf(MockLint)
		})

		it("should not throw an error when getting the config", async () => {
			debugger;
			await expect(linter.getConfig(file)).resolves.not.toThrow()
		})

		it('should return the proper config', async () => {
			const parsedConfig = await linter.getConfig(file);
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
				if (lintResults.length) {
					const first = lintResults.at(0) as ESLint.LintResult
					filePath = first.filePath
					usedDeprecatedRules = first.usedDeprecatedRules
				}
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
