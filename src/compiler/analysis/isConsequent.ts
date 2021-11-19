// import { Expression, BinaryExpression, Literal, TypeExpression, Reference, DotExpression, Type, NumberType, ReferenceType } from "../ast";
// import toCodeString from "../toCodeString";
// import { IsType } from "./isType";
// import splitExpressions from "./splitExpressions";
// import combineExpressions from "./combineExpressions";

// type Maybe = true | false | null
// //  a  \  b |  true   false   null
// //  --------------------------------
// //  true    |  true   true    true
// //  false   |  true   false   null
// //  null    |  true   null    null
// function max(a: Maybe, b: Maybe): Maybe {
//     if (a === true || b === true)
//         return true
//     if (a == null || b == null)
//         return null
//     return false
// }
// //  a  \  b |  true   false   null
// //  --------------------------------
// //  true    |  true   false   null
// //  false   |  false  false   false
// //  null    |  null   false   null
// function min(a: Maybe, b: Maybe): Maybe {
//     if (a === false || b === false)
//         return false
//     if (a == null || b == null)
//         return null
//     return true
// }
// //  a  \  b |  true   false   null
// //  --------------------------------
// //  true    |  true   null    null
// //  false   |  null   false   null
// //  null    |  null   null    null
// function same(a: Maybe, b: Maybe): Maybe {
//     return a === b ? a : null
// }

// const dot = new DotExpression({})

// //  Our legacy isConsequent expects binary expressions
// //  We will convert our new types to dot is expressions
// function typeToLegacyExpression(type: Type) {
//     if (ReferenceType.is(type)) {
//         return new BinaryExpression({ left: dot, operator: "is", right: type })
//     }
//     if (NumberType.is(type)) {
//         if (type.min != null && type.min === type.max) {
//             return new BinaryExpression({ left: dot, operator: "==", right: type.min! })
//         }
//         let min: Expression | null = type.min != null ? new BinaryExpression({ left: dot, operator: type.minExclusive ? ">" : ">=", right: type.min }) : null
//         let max: Expression | null = type.max != null ? new BinaryExpression({ left: dot, operator: type.maxExclusive ? "<" : "<=", right: type.max }) : null
//         if (min) {
//             type = max ? new BinaryExpression({ left: min, operator: "&", right: max}) : min
//         }
//         else {
//             type = max!
//         }
//         // new BinaryExpression({ left: dot, operator: "is", right: types.Number })
//         //  TODO: I think we need to simplify our isConsequent logic for the new type system.
//     }
//     return type
// }

// /**
//  * Assuming expression 'a' is true then this function returns
//  * true if 'b' is necessarily true
//  * false if 'b' is necessarily false
//  * null if we cannot determine
//  */
// export default function isConsequent(a: Expression, b: Expression, isType: IsType = (a, b) => a.name === b.name): true | false | null {
//     if (toCodeString(a) === toCodeString(b)) {
//         return true
//     }
//     if (Type.is(a)) {
//         a = typeToLegacyExpression(a)
//     }
//     if (Type.is(b)) {
//         b = typeToLegacyExpression(b)
//     }
//     if (BinaryExpression.is(a)) {
//         if (BinaryExpression.is(b)) {
//             if (toCodeString(a.left) === toCodeString(b.left)) {
//                 if (Reference.is(a.right) && Reference.is(b.right)) {
//                     if (a.operator === "is" && b.operator === "is") {
//                         // use our isType to see if we know that a is b
//                         return isType(a.right, b.right)
//                     }
//                 }
//                 if (Literal.is(a.right) && Literal.is(b.right)) {
//                     let ar = a.right.value!
//                     let br = b.right.value!
//                     switch (a.operator) {
//                         case '>':
//                             switch (b.operator) {
//                                 case '>=':                                  // > 0 is >= 0, > 1 is >= 0
//                                 case '!=':                                  // > 0 is != 0, > 1 is != 0
//                                 case '>':  return ar >= br ? true : null    // > 0 is > 0, > 1 is > 0
//                                 case '<=':                                  // > 0 isnt <= 0, > 1 isnt <= 0
//                                 case '==':                                  // > 0 isnt == 0, > 1 isnt == 0
//                                 case '<':  return ar >= br ? false : null   // > 0 isnt < 0, > 1 isnt < 0
//                             }
//                             break
//                         case '>=':
//                             switch (b.operator) {
//                                 case '>=':                                  // >= 1 is >= 0
//                                 case '>':  return ar > br ?  true : null    // >= 1 is > 0
//                                 case '==':                                  // >= 1 isnt == 0
//                                 case '<=': return ar > br ? false : null    // >= 1 isnt <= 0
//                                 case '<':  return ar >= br ? false : null   // >= 0 isnt < 0, >= 1 isnt < 0
//                             }
//                             break
//                         case '<':
//                             switch (b.operator) {
//                                 case '<=':                                  // < 0 is <= 0, < -1 is <= 0
//                                 case '!=':                                  // < 0 is != 0, < -1 is != 0
//                                 case '<':  return ar <= br ?  true : null   // < 0 is < 0, < -1 is < 0
//                                 case '>=':                                  // < 0 isnt >= 0, < -1 isnt >= 0
//                                 case '==':                                  // < 0 isnt == 0, < -1 isnt == 0
//                                 case '>':  return ar <= br ? false : null   // < 0 isnt > 0, < -1 isnt > 0
//                             }
//                             break
//                         case '<=':
//                             switch (b.operator) {
//                                 case '<=':                                  // <= -1 is <= 0
//                                 case '<':  return ar < br ?  true : null    // <= -1 is < 0
//                                 case '==':                                  // <= -1 isnt == 0
//                                 case '>=': return ar < br ? false : null    // <= -1 isnt >= 0
//                                 case '>':  return ar <= br ? false : null   // <= 0 isnt > 0, <= -1 isnt > 0
//                             }
//                             break
//                         case '==':
//                             switch (b.operator) {
//                                 case '<=': return ar <= br      // == 0 is <= 0, == 0 is <= 1
//                                 case '<': return ar < br        // == 0 is < 1
//                                 case '==': return ar === br     // == 0 is == 0
//                                 case '>=': return ar >= br      // == 0 is >= 0
//                                 case '>':  return ar > br       // == 0 is > -1
//                                 case '!=': return ar != br      // == 0 is != 1
//                             }
//                             break
//                     }
//                 }
//                 else if (toCodeString(a.right) === toCodeString(b.right)) {
//                     // we can still analyze some comparisons if we know the both right hand operators are the same.
//                     switch (a.operator) {
//                         case '>':
//                             switch (b.operator) {
//                                 case '>=': case '!=': return true
//                                 case '<': case '<=': case '==': return false
//                             }
//                             break
//                         case '>=':
//                             switch (b.operator) {
//                                 case '<': return false
//                             }
//                             break
//                         case '<':
//                             switch (b.operator) {
//                                 case '<=': case '!=': return true
//                                 case '>': case '>=': case '==': return false
//                             }
//                             break
//                         case '<=':
//                             switch (b.operator) {
//                                 case '>': return false
//                             }
//                             break
//                         case '==':
//                             switch (b.operator) {
//                                 case '>=': case '<=': return true
//                                 case '>': case '<': case '!=': return false
//                             }
//                             break
//                         case '!=':
//                             switch (b.operator) {
//                                 case '==': return false
//                             }
//                             break
//                         case 'is':
//                             switch (b.operator) {
//                                 case 'isnt': return false
//                             }
//                             break
//                         case 'isnt':
//                             switch (b.operator) {
//                                 case 'is': return false
//                             }
//                             break
//                     }
//                 }
//             }
//         }
//     }

//     //  A & B & C => C & D & E
//     //  if any term on the left results in a false on the right then false (not consequent)
//     //  if all terms on the right are true based on any term on the left then true (consequent)
//     //  otherwise null (unknown)
//     if (BinaryExpression.is(b) && b.operator === "&" || BinaryExpression.is(a) && a.operator === "&") {
//         let allTrue = true
//         for (let bTerm of splitExpressions(b, "&")) {
//             let bTermResult: boolean | null = null
//             for (let aTerm of splitExpressions(a, "&")) {
//                 let aTermResult = isConsequent(aTerm, bTerm, isType)
//                 if (aTermResult === false) {
//                     return false
//                 }
//                 if (aTermResult === true) {
//                     bTermResult = true
//                     break
//                 }
//             }
//             if (bTermResult !== true) {
//                 allTrue = false
//             }
//         }
//         return allTrue || null
//     }

//     //  A | B => C & D
//     if (BinaryExpression.is(a) && a.operator === "|") {
//         return same(isConsequent(a.left, b, isType), isConsequent(a.right, b, isType))
//     }
//     if (BinaryExpression.is(b) && b.operator === "|") {
//         return max(isConsequent(a, b.left, isType), isConsequent(a, b.right, isType))
//     }
//     return null
// }
