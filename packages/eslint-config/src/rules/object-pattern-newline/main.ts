import {Rule} from "eslint";
import {AST} from 'eslint-plugin';

const VALID_ITEM_TYPES = new Set(["Property", "ExperimentalRestProperty", "RestElement"]);

const DEFAULT_ITEMS = 4;
const MIN_ITEMS = 0;
const DEFAULT_MAX_LENGTH = Infinity;
const MIN_MAX_LENGTH = 17;

const fixer = (context: Rule.RuleContext, nestTab: string, node: AST.Node, spacer = "\n") => {
	return (eslintFixer: Rule.RuleFixer): Rule.Fix => {
		// ... same as original fixer function ...
	};
};

const rule: Rule.RuleModule = {
	meta: {
		type: "layout",
		docs: {
			description: "",
			category: "Stylistic Issues",
			url: "AdaSupport/eslint-plugin-object-pattern-newline",
		},
		fixable: "whitespace",
		schema: [
			{
				type: "object",
				properties: {
					items: {
						type: "number",
						minimum: 1,
					},
					"max-len": {
						type: "number",
						minimum: 17,
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			mustSplitMany: "Items must be broken into multiple lines if more than {{maxItems}} elements.",
			mustSplitLong: "Items must be broken into multiple lines if the line length exceeds {{maxLineLength}} characters, saw {{lineLength}}.",
			limitLineCount: "Each line can have maximum one element. (Expected to span {{expectedLineCount}} lines, saw {{lineCount}})",
		},
	},
	create(context: Rule.RuleContext) {
		const options = context.options[0] ?? {};
		const maxItems = options.items ?? DEFAULT_ITEMS;
		const maxLineLength = options["max-len"] ?? DEFAULT_MAX_LENGTH;

		if (maxItems < MIN_ITEMS) {
			throw new Error(`Minimum items can't be less than ${MIN_MAX_LENGTH}`);
		}
		if (maxLineLength < MIN_MAX_LENGTH) {
			throw new Error(`Maximum line length can't be less than ${MIN_MAX_LENGTH}`);
		}

		return {
			ObjectPattern(node: AST.Node) {
				// ... same as original ObjectPattern function ...
			},
		};
	},
};

export default rule;
