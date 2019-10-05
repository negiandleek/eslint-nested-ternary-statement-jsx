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
    const maxOfSiblings = 1;
    const maxOfNest = 1;
    const stack = [];

    function checkJsx(node) {
      stack.push(node);

      if (stack.length > maxOfNest) {
        context.report({
          node,
          messageId: "exceedNest",
          data: {
            num: stack.length,
            max: maxOfNest
          }
        });
      }

      if (node.children.length > maxOfSiblings) {
        context.report({
          node: node,
          messageId: "exceedSiblings",
          data: {
            num: node.children.length,
            max: maxOfSiblings
          }
        });
      }
    }

    function popStack() {
      stack.pop();
    }

    return {
      JSXElement: checkJsx,
      "JSXElement:exit": popStack
    };
  }
};
