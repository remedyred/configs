import changelog from './changelog'
import semanticReleaseConventionalCommits from './semantic-release-conventional-commits'
import npm from './npm'
import git from './git'
import github from './github'
import releaseNotesGenerator from './release-notes-generator'
import SemanticRelease from 'semantic-release'

export default [
	['@semantic-release/changelog', changelog],
	['semantic-release-conventional-commits', semanticReleaseConventionalCommits],
	['@semantic-release/release-notes-generator', releaseNotesGenerator],
	['@semantic-release/npm', npm],
	['@semantic-release/git', git],
	['@semantic-release/github', github]
] as SemanticRelease.PluginSpec[]
