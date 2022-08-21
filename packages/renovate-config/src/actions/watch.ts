import {sleep} from '@snickbit/utilities'
import {$out, Config} from '../common'
import {ParsedArgs} from '@snickbit/node-cli'
import chokidar from 'chokidar'
import build from './build'
import debounce from 'debounce'

export default async function watch(args: ParsedArgs, config: Config) {
	const promises: Promise<any>[] = []

	const runBuild = debounce(async () => {
		try {
			await build(args, config)
		} catch (e) {
			$out.error(e.message)
		}

		await sleep(500)
		// remove promise from array
		promises.splice(promises.indexOf(this), 1)

		if (promises.length === 0) {
			$out.info('Watching files for changes...')
		}
	}, 300)

	let ready = false
	chokidar
		.watch([config.source], {
			persistent: true,
			awaitWriteFinish: {
				stabilityThreshold: 2000,
				pollInterval: 100
			}
		})
		.on('ready', () => {
			ready = true
			promises.push(runBuild())
		})
		.on('all', (eventName, path) => {
			if (ready && promises.length < 2) {
				$out.debug('adding build to queue')
				promises.push(runBuild())
			} else {
				$out.verbose({eventName, path})
			}
		})
}
