import {defineConfig} from 'tsup'

export default defineConfig({
	entry: ['src/*.ts', 'src/exports/*.ts'],
	clean: true,
	dts: true,
	splitting: false,
	format: ['esm'],
	outExtension: () => ({js: '.js'})
})
