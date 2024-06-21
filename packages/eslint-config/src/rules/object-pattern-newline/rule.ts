import {AST_NODE_TYPES, ESLintUtils, TSESLint, TSESTree} from '@typescript-eslint/utils';
import {getPostfix, getPrefix, isNamedObject, parseComments} from "@/rules/object-pattern-newline/helpers.ts";

const VALID_ITEM_TYPES = new Set([
	"Property",
	"ExperimentalRestProperty",
	"RestElement",
]);

type Options = [
	{
		items?: number;
		"max-len"?: number;
	},
];
type MessageIds = 'mustSplitMany' | 'mustSplitLong' | 'limitLineCount';

type ObjectPattern = TSESTree.ObjectPattern;
type RuleContext = Readonly<TSESLint.RuleContext<MessageIds, Options>>
type RestOrProperty = TSESTree.Property | TSESTree.RestElement;

interface RuleConfig {
	defaultItems: number;
	defaultMaxLength: number;
	maxItems: number;
	maxLineLength: number;
	minItems: number;
	minMaxLength: number;
}

const config: RuleConfig = {
	defaultItems: 4,
	defaultMaxLength: Infinity,
	maxItems: 4,
	maxLineLength: 80,
	minItems: 0,
	minMaxLength: 17,
};

const {RuleCreator} = ESLintUtils;

function mapProperties(properties: any, tab: string, source: any) {
	let leadingCommentUsed = false;
	return properties.map((p: any, index: any) => {
		const nextP = properties[index + 1];
		const isRestProperty = p.type === AST_NODE_TYPES.RestElement;
		const valText = isRestProperty ? source.getText(p) : source.getText(p.value);
		const keyName = !isRestProperty && isNamedObject(p.key) ? p.key.name : '';

		const value = isRestProperty ? valText : valText === keyName ? "" : `: ${valText}`;
		const pLeadingComments = source.getCommentsBefore(p) ?? [];
		const pTrailingComments = source.getCommentsAfter(p) ?? [];
		const nextPLeadingComments = nextP ? source.getCommentsBefore(nextP) ?? [] : [];

		const leadingComments = parseComments(pLeadingComments.slice(leadingCommentUsed ? 1 : 0), tab);
		let trailingComments = parseComments(pTrailingComments, tab);

		if (nextPLeadingComments[0]?.loc.start.line === p.loc.start.line) {
			trailingComments = ` //${nextPLeadingComments[0].value}`;
			leadingCommentUsed = true;
		} else {
			leadingCommentUsed = false;
		}

		const prefix = getPrefix(tab, leadingComments);
		const postfix = getPostfix(trailingComments);

		if (isRestProperty) {
			return `${prefix}${value}${trailingComments}`;
		}

		if (p.value.type === AST_NODE_TYPES.AssignmentPattern) {
			const valueLeftName = isNamedObject(p.value.left) ? p.value.left.name : null;
			return valueLeftName === keyName
					? `${prefix}${valText}${postfix}`
					: `${prefix}${keyName}: ${valText}${postfix}`;
		}

		return `${prefix}${keyName}${value}${postfix}`;
	});
}

function fixer(
		context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
		node: TSESTree.ObjectPattern,
		nestTab = '',
		spacer = ''
) {
	return (eslintFixer: TSESLint.RuleFixer) => {
		const tab = spacer === "\n" ? `${nestTab}  ` : "";
		const source = context.getSourceCode();
		const type = node.typeAnnotation ? source.getText(node.typeAnnotation) : "";

		const {properties} = node;

		const mapper = mapProperties(properties, tab, source);
		const newVal = `{${spacer}${mapper.join(`${spacer}`)}${spacer}${nestTab}}${type}`;

		return eslintFixer.replaceText(node, newVal);
	};
}

function isPropertyTypesValid(properties: RestOrProperty[]) {
	for (const p of properties) {
		if (!VALID_ITEM_TYPES.has(p.type)) {
			return false
		}
	}
	return true;
}

// Extracted function to handle the logic for ignore comments
function getUpdatedLineCount(node: any, lineCount: number, properties: any, source: any) {
	for (const p of properties) {
		const pLeadingComments = source.getCommentsBefore(p);
		const previousProperty = properties[properties.indexOf(p) - 1];
		for (const c of pLeadingComments) {
			let commentLines = (c.loc.end.line - c.loc.start.line + 1);
			if (c.loc.start.line === node.loc.start.line || (previousProperty && (c.loc.start.line === previousProperty.loc.end.line))) {
				commentLines -= 1;
			}
			lineCount -= commentLines;
		}
	}
	return lineCount;
}

// Extracted function to report context for long lines
function reportContextForLongLine(context: any, node: any, nestTab: string, maxLineLength: number, lines: any) {
	const line = lines[node.loc.start.line - 1];
	if (line.length > maxLineLength) {
		context.report({
			node,
			messageId: "mustSplitLong",
			data: {maxLineLength, lineLength: line.length},
			fix: fixer(context, node, nestTab),
		});
		return true;
	}
	return false;
}

// Extracted function to report context for many props
function reportContextForManyProp(context: any, node: any, nestTab: string, maxItems: number, properties: any) {
	if (properties.length > maxItems) {
		context.report({
			node,
			messageId: "mustSplitMany",
			data: {maxItems},
			fix: fixer(context, node, nestTab),
		});
		return true;
	}
	return false;
}

// Function to report context for mismatched line count
function reportContextForMismatchedLines(context: any, node: any, nestTab: string, properties: any, lineCount: number) {
	let expectedLineCount = properties.length + 2;
	for (const property of properties) {
		if (property.value && property.value.type === AST_NODE_TYPES.ObjectPattern) {
			expectedLineCount += property.value.loc.end.line - property.value.loc.start.line;
		}
	}
	if (lineCount !== expectedLineCount) {
		context.report({
			node,
			messageId: "limitLineCount",
			data: {expectedLineCount, lineCount},
			fix: fixer(context, node, nestTab),
		});
	}
}


function handleObjectPattern(context: RuleContext, node: ObjectPattern) {
	const {properties} = node;
	const {maxItems, maxLineLength} = config;

	if(!isPropertyTypesValid(properties)) {
		return;
	}

	const startLine = node.loc.start.line;
	const endLine = node.loc.end.line;

	const source = context.getSourceCode();
	const {lines} = source;
	const nestTab = lines[startLine - 1].match(/^\s*/)?.[0] ?? "";

	// const blankLinesReported = false;
	let lineCount = 1 + (endLine - startLine);

	if (node.typeAnnotation) {
		lineCount = 1 + (node.typeAnnotation.loc.start.line - startLine);
	}

	lineCount = getUpdatedLineCount(node, lineCount, properties, source);

	const isReported = reportContextForLongLine(context, node, nestTab, maxLineLength, lines)
			|| reportContextForManyProp(context, node, nestTab, maxItems, properties);

	if (!isReported) {
		reportContextForMismatchedLines(context, node, nestTab, properties, lineCount);
	}
}

// Type: RuleModule<"uppercase", >
export const rule = RuleCreator.withoutDocs<Options, MessageIds>({
	create(context) {
		let maxItems = 0;
		let maxLineLength = 0;
		if (typeof context.options[0] === "object") {
			const optionsObj = context.options[0];
			maxItems = typeof optionsObj.items !== "undefined" ? optionsObj.items : config.defaultItems;
			maxLineLength = typeof optionsObj["max-len"] !== "undefined" ? optionsObj["max-len"] : config.defaultMaxLength;
		} else {
			[
				maxItems = config.defaultItems,
				maxLineLength = config.defaultMaxLength,
			] = context.options;
		}
		if (maxItems < config.minItems) {
			throw new Error(`Minimum items must not be less than ${config.minMaxLength}`);
		}
		if (maxLineLength < config.minMaxLength) {
			throw new Error(`Maximum line length must not be less than ${config.minMaxLength}`);
		}

		return {
			ObjectPattern(node: ObjectPattern) {
				handleObjectPattern(context, node)
			},
		};
	},
	meta: {
		docs: {
			description:
					'Ensure that object pattern statements spanning over a specific amount are formatted across multiple lines.',
		},
		fixable: "whitespace",
		messages: {
			mustSplitMany: "Items must be broken into multiple lines if more than {{maxItems}} elements.",
			mustSplitLong: "Items must be broken into multiple lines if the line length exceeds {{maxLineLength}} characters, saw {{lineLength}}.",
			limitLineCount: "Each line can have maximum one element. (Expected to span {{expectedLineCount}} lines, saw {{lineCount}})",
		},
		type: "layout",
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
	},
	defaultOptions: [{}],
});
