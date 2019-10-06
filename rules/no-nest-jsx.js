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
    const stackJsxElement = [];
    let conditionDeep = -1;

    function diveExpressionContainer(node) {
      if (node.expression.type === "ConditionalExpression") {
        conditionDeep += 1;
      }
    }

    function stashAndCheckJsxElement(node) {
      if (conditionDeep <= -1) {
        return false;
      }

      if (!stackJsxElement[conditionDeep]) {
        stackJsxElement[conditionDeep] = [];
      }

      stackJsxElement[conditionDeep].push(node);

      if (stackJsxElement[conditionDeep].length > maxOfNest) {
        context.report({
          node,
          messageId: "exceedNest",
          data: {
            num: stackJsxElement[conditionDeep].length,
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

    function surfaceExpressionContainer(node) {
      if (node.expression.type === "ConditionalExpression") {
        conditionDeep -= 1;
      }
    }

    function popJsxElement() {
      if (stackJsxElement[conditionDeep]) {
        stackJsxElement[conditionDeep].pop();
      }
    }

    return {
      JSXExpressionContainer: diveExpressionContainer,
      "JSXExpressionContainer:exit": surfaceExpressionContainer,
      JSXElement: stashAndCheckJsxElement,
      "JSXElement:exit": popJsxElement
    };
  }
};
