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
    const maxOfSiblings = 3;
    const maxOfNest = 2;
    const stackJsxElement = [];
    let conditionDeep = -1;
    let total = [];

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

      if (typeof total[conditionDeep] === "undefined") {
        total[conditionDeep] = 0;
      }

      stackJsxElement[conditionDeep].push(node);

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
        if(it.type !== "JSXElement" && it.type !== "JSXExpressionContainer"){
          return false
        }

        if(it.type === "JSXElement"){
          return true
        }
       
        const expression = it.expression;

        if(expression.type === "LogicalExpression"){
          if((expression.left && expression.left.type) === "JSXElement" || 
            (expression.right && expression.right.type) === "JSXElement"){
            return true
          }
        }

        const callee = expression.callee

        if(callee && callee.type === "ArrowFunctionExpression"){
          const body = callee.body
          
          if(body.type === "JSXElement") {
            return true
          }

          if(body.type === "BlockStatement"){
            const found = body.body.find(it => it.type === "ReturnStatement")
            if(found && found.argument && found.argument.type === "JSXElement"){
              return true
            }
          }
        }

        return false
        
      }).length;

      total[conditionDeep] = total[conditionDeep] + length;

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
        total.pop();
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
