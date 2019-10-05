"use strict";

const rule = context => {
	let vars = [];

	if(Array.isArray(context.options[0])){
		vars = context.options[0]
	}

	return {
		Identifier: node => {
			if(vars.indexOf(node.name) !== -1){
				context.report({
					node, 
					message: "You MUST NOT USE hoge variable."
				});
			}
		}
	}
}

rule.schema = [{
	type: "array",
	items: {type: "string"},
	uniqueItems: true	
}]

module.exports = rule;
