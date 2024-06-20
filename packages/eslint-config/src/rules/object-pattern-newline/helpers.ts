import {AST_TOKEN_TYPES, TSESTree} from "@typescript-eslint/utils";

export function isNamedObject(obj: unknown): obj is { name: string } {
	return typeof obj === "object" && obj !== null && "name" in obj && !!obj.name;
}

export function parseComments(comments: TSESTree.Comment[], prefix: string) {
	return comments.map(comment => comment.type === AST_TOKEN_TYPES.Line ? `//${comment.value}` : `/*${comment.value}*/`).join(`\n${prefix}`);
}

export function getPrefix(tab: string, leadingComments: string) {
	return leadingComments ? `${tab}${leadingComments}\n${tab}` : `${tab}`;
}

export function getPostfix(trailingComments: string) {
	return `,${trailingComments}`;
}
