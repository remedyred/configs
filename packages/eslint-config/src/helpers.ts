import {Linter} from "eslint";
import {fileURLToPath} from "url";
import path from "path";
import {FlatCompat} from "@eslint/eslintrc";

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const compat = new FlatCompat({
	baseDirectory: __dirname,
	resolvePluginsRelativeTo: __dirname,
});

export function makeConfig(...configs: any[]): Linter.Config {
	const typedConfigs = configs as Linter.Config[]
	let combined = {} as Linter.Config;
	for (const config of typedConfigs) {
		combined = {...combined, ...config};
	}
	return combined;
}
