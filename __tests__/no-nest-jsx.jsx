"use strict"

const rule = require("../rules/no-nest-jsx");

const RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester();

const valid = [{
	code: 'var fuga = "fuga";',
}];

// const invalid = [{
//   code: `
//     <div>
//       {is ? (
//       <ul>
//         <li>aaa</li>
//       </ul>
//       ) : null}
//     </div>
//   `,
// 	errors: [{ message: "Too many nested JSXElement 2. Maximum allowed is 1" }]
// }];

ruleTester.run("no-nest-jsx", rule, valid);
