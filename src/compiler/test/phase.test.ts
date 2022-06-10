// import { strict as assert } from "assert";
// import { createMultiFunctions } from "../phases/createMultiFunctions";
// import { opsToValueNodes } from "../phases/opsToValueNodes";
// import { testModule } from "./testModule";

// // test opsToNodes phase handling of functions and binary operators
// testModule(
// `
// double = () => 2
// double = x => 2 * x
// double = (x) => 2 * x
// double = (x, y) => 2 * x
// double = x =>
//     x * 2
// `,
// `module test {
//     const double = () => 2
//     const double = (
//         var x
//     ) => \`*\`(2,x)
//     const double = (
//         var x
//     ) => \`*\`(2,x)
//     const double = (
//         var x
//         var y
//     ) => \`*\`(2,x)
//     const double = (
//         var x
//     ) => {
//         \`*\`(x,2)
//     }
// }`,
// { finalPhase: opsToValueNodes },
// );

// testModule(
// `
// x +++= 2 * 10
// `,
// `module test {
//     x = \`+++\`(x,\`*\`(2,10))
// }`,
// { finalPhase: createMultiFunctions },
// );

// testModule(
// `
// (x, y) = foo()
// `,
// `module test {
//     const _opsToNodes_1 = foo()
//     const x = _opsToNodes_1.x
//     const y = _opsToNodes_1.y
// }`,
// { finalPhase: createMultiFunctions },
// );

// testModule(
// `
// [x, y] = foo()
// `,
// `module test {
//     const _opsToNodes_1 = foo()
//     const x = _opsToNodes_1[0]
//     const y = _opsToNodes_1[1]
// }`,
// { finalPhase: createMultiFunctions },
// );

// testModule(
// `
// foo = ""
//     <html>
//         <body>
//         </body>
//     </html>
// `,
// `module test {
//     const foo = "<html>\\n    <body>\\n    </body>\\n</html>"
// }`,
// { finalPhase: createMultiFunctions },
// );

// testModule(
// `
// foo = ""
//     <html>
//         <body>

// `,
// `module test {
//     const foo = "<html>\\n    <body>"
// }`,
// { finalPhase: createMultiFunctions },
// );

// testModule(
// `
// foo = ""
//     (a, b) =>
//         a + b
// `,
// `module test {
//     const foo = "(a, b) =>\\n    a + b"
// }`,
// { finalPhase: createMultiFunctions },
// );

// testModule(
// `
// foo()
//     1
//     bar()
//         2
//         3
// `,
// `module test {
//     foo(1,bar(2,3))
// }`,
// { finalPhase: createMultiFunctions }
// );

// assert.throws(() => {
//     testModule(
//         `
//         @Foo()
//         `,
//         `module test {\n    @Foo()\n}`,
//         { finalPhase: createMultiFunctions }        
//     )
// })

// testModule(
// `
// @Foo()
// x = 1
// `,
// `module test {
//     {
//         @Foo()
//     }
//     const x = 1
// }`,
// { finalPhase: createMultiFunctions }
// )

// testModule(
// `
// add = (a: Number, b: Number): Number => a
// `
// ,
// `module test {
//     const add = add(
//         var a : Number
//         var b : Number
//     ): Number => a
// }`,
// { finalPhase: createMultiFunctions }
// )

// const equivalentFunctions = [
// `
// x = ()
//     a
//     b
// =>
//     a + b
// `,
// `
// x =
//     ()
//         a
//         b
//     =>
//         a + b
// `,
// `
// x = (a, b) => a + b
// `,
// `
// x = (a, b) =>
//     a + b
// `
// ];
// for (const func of equivalentFunctions) {
//     testModule(func,
// `module test {
//     const x = x(
//         var a
//         var b
//     ) => \`+\`(a,b)
// }`,
// { finalPhase: createMultiFunctions })
// }

// // testModule(
// // `@Foo(bar = 20)
// // x = ()
// //     @Meta()
// //         js = ""
// //             This is Javascript
// //     a
// //     b
// // =>
// //     a + b`,
// // `module test {
// //     const x = {
// //         @Foo(const bar = 20)
// //     }
// //     x(
// //         {
// //             @Meta(const js = "This is Javascript")
// //         }
// //         var a
// //         var b
// //     ) => `+`(a,b)
// // }`,
// // { finalPhase: createMultiFunctions }
// // )
