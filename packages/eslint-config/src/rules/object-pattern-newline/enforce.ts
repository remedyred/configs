const VALID_ITEM_TYPES = new Set([
  "Property",
  "ExperimentalRestProperty",
  "RestElement",
]);

function fixer(context, nestTab, node, spacer = "\n") {
  return (eslintFixer) => {
    const tab = spacer === "\n" ? `${nestTab}  ` : "";
    const source = context.getSourceCode();
    const type = node.typeAnnotation ? source.getText(node.typeAnnotation) : "";

    const {properties} = node;

    let leadingCommentUsed = false;

    const mapper = properties.map((p) => {
      const nextP = properties[properties.indexOf(p) + 1];
      const isRestProperty = p.type === "ExperimentalRestProperty" || p.type === "RestElement";
      const valText = isRestProperty ? source.getText(p) : source.getText(p.value);

      let value;

      if (isRestProperty) {
        value = valText;
      } else {
        value = valText === p.key.name ? "" : `: ${valText}`;
      }

      const pLeadingComments = source.getCommentsBefore(p);
      const pTrailingComments = source.getCommentsAfter(p);
      const nextPLeadingComments = nextP && source.getCommentsBefore(nextP);

      const leadingComments = (pLeadingComments || []).slice(leadingCommentUsed ? 1 : 0).map((c) => (
          c.type === "Line" ? `//${c.value}` : `/*${c.value}*/`
      )).join(`\n${tab}`);

      let trailingComments = (pTrailingComments || []).map((c) => ` //${c.value}`).join("\n");

      if (
          nextPLeadingComments
          && nextPLeadingComments[0]
          && nextPLeadingComments[0].loc.start.line === p.loc.start.line
      ) {
        trailingComments = ` //${nextPLeadingComments[0].value}`;
        leadingCommentUsed = true;
      } else {
        leadingCommentUsed = false;
      }

      const prefix = leadingComments ? `${tab}${leadingComments}\n${tab}` : `${tab}`;
      const postfix = `,${trailingComments}`;

      if (isRestProperty) {
        return `${prefix}${value}${trailingComments}`;
      }

      if (p.value.type === "AssignmentPattern") {
        if (p.value.left.name === p.key.name) {
          return `${prefix}${valText}${postfix}`;
        }

        return `${prefix}${p.key.name}: ${valText}${postfix}`;
      }

      return `${prefix}${p.key.name}${value}${postfix}`;
    });

    const newVal = `{${spacer}${mapper.join(`${spacer}`)}${spacer}${nestTab}}${type}`;

    return eslintFixer.replaceText(node, newVal);
  };
}

const DEFAULT_ITEMS = 4;
const MIN_ITEMS = 0;
const DEFAULT_MAX_LENGTH = Infinity;
const MIN_MAX_LENGTH = 17;

export default {
  includeComments: true,
  meta: {
    type: "layout",
    docs: {
      description: "enforce multiple lines for object pattern statements past a certain number of items",
      category: "Stylistic Issues",
      url: "AdaSupport/eslint-plugin-object-pattern-newline",
    },
    fixable: "whitespace",
    schema: {
      oneOf: [
        {
          type: "array",
          minItems: 1,
          maxItems: 1,
          items: {
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
          },
        },
        {
          type: "array",
          minItems: 0,
          maxItems: 2,
          items: {
            type: "number",
          },
        },
      ],
    },
    messages: {
      mustSplitMany: "Items must be broken into multiple lines if there are more than {{maxItems}} elements.",
      mustSplitLong: "Items must be broken into multiple lines if the line length exceeds {{maxLineLength}} characters, saw {{lineLength}}.",
      limitLineCount: "Each line can have maximum one element. (Expected to span {{expectedLineCount}} lines, saw {{lineCount}})",
    },
  },
  create(context) {
    let maxItems;
    let maxLineLength: number;
    if (typeof context.options[0] === "object") {
      const optionsObj = context.options[0];
      maxItems = typeof optionsObj.items !== "undefined" ? optionsObj.items : DEFAULT_ITEMS;
      maxLineLength = typeof optionsObj["max-len"] !== "undefined" ? optionsObj["max-len"] : DEFAULT_MAX_LENGTH;
    } else {
      [
        maxItems = DEFAULT_ITEMS,
        maxLineLength = DEFAULT_MAX_LENGTH,
      ] = context.options;
    }
    if (maxItems < MIN_ITEMS) {
      throw new Error(`Minimum items must not be less than ${MIN_MAX_LENGTH}`);
    }
    if (maxLineLength < MIN_MAX_LENGTH) {
      throw new Error(`Maximum line length must not be less than ${MIN_MAX_LENGTH}`);
    }
    return {
      ObjectPattern(node) {

      },
    };
  },
};
