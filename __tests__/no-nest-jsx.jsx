"use strict"

const rule = require("../rules/no-hoge");

const RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester();

const valid = [{
	code: 'var fuga = "fuga";',
}];

const invalid = [{
	code: 'var fuga = "hoge";',
	options:[["fuga"]],
	errors: [{ message: "You MUST NOT USE hoge variable.", type: "Identifier" }]
}];

ruleTester.run("no-hoge", rule, {valid, invalid});
