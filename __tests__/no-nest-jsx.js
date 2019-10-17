"use strict"
const path = require('path');

const rule = require("../rules/no-nest-jsx.js");
// const BABEL_ESLINT = path.join(__dirname, '../node_modules', 'babel-eslint')

const RuleTester = require("eslint").RuleTester;
const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};
const ruleTester = new RuleTester({parserOptions});

ruleTester.run("no-nest-jsx", rule, {
	valid: [{
		code: `
		<p>
			aaa
		</p>`
	}],
	invalid: [{
		code: `
			const test = () => (
				<div>
					{is ? (
					<ul>
						<li>aaa</li>
					</ul>
					) : null}
				</div>
			)
  	`,
		errors: [{ message: "Too many nested JSXElement 2. Maximum allowed is 1." }]
	}]
});
