module.exports = {
  meta: {
    type: "suggestion",
    messages: {
      exceedSiblings: "Too many siblings {{num}}. Maximum allowed is {{max}}",
      exceedNest:
        "Too many nested JSXElement {{num}}. Maximum allowed is {{max}}."
    }
  },
  create: function(context) {
    const maxOfSiblings = 2;
    const maxOfNest = 2;
    const stackJsxExpressionContainer = [];
    const stackJsxElement = [];

    function stashStackJsxExpressionContainer(node) {
      stackJsxExpressionContainer.push(node);
    }

    function stashAndCheckJsxElement(node) {
      if (stackJsxExpressionContainer.length <= 0) {
        return false;
      }

      stackJsxElement.push(node);

      if (stackJsxElement.length > maxOfNest) {
        context.report({
          node,
          messageId: "exceedNest",
          data: {
            num: stackJsxElement.length,
            max: maxOfNest
          }
        });
      }

      const length = node.children.filter(it => {
        return it.type === "JSXElement";
      }).length;

      if (length > maxOfSiblings) {
        context.report({
          node: node,
          messageId: "exceedSiblings",
          data: {
            num: length,
            max: maxOfSiblings
          }
        });
      }
    }

    function popStackJsxExpressionContainer() {
      if (stackJsxExpressionContainer.length > 0) {
        stackJsxExpressionContainer.pop();
      }
    }

    function popPopJsxElement() {
      if (stackJsxElement.length > 0) {
        stackJsxElement.pop();
      }
    }

    return {
      JSXExpressionContainer: stashStackJsxExpressionContainer,
      "JSXExpressionContainer:exit": popStackJsxExpressionContainer,
      JSXElement: stashAndCheckJsxElement,
      "JSXElement:exit": popPopJsxElement
    };
  }
};
