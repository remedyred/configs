#!/usr/bin/env node
import {defaultConfig} from './common'
import * as actions from './actions'
import cli from '@snickbit/node-cli'

cli()
	.name('builder')
	.hideBanner()
	.config(defaultConfig)
	.actions(actions)
	.run()
