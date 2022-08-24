/* eslint-disable object-curly-newline */
export default {
	majorTypes: ['breaking'],
	minorTypes: ['feat', 'minor'],
	patchTypes: [
		'patch',
		'chore',
		'docs',
		'fix',
		'refactor',
		'style',
		'test'
	],
	mergePattern: /^Merge pull request #(\d+) from (.*)$/,
	mergeCorrespondence: ['id', 'source']
}
