#!/usr/bin/env node
import {defaultConfig} from './common'
import {cli} from '@snickbit/node-cli'
import * as actions from './actions'

cli()
	.name('builder')
	.hideBanner()
	.config(defaultConfig)
	.actions(actions)
	.run()
