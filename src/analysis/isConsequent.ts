import { Expression, BinaryExpression, Literal, TypeExpression } from "../ast";
import toCodeString from "../toCodeString";

type Maybe = true | false | null
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   true    true
//  false   |  true   false   null
//  null    |  true   null    null
function max(a: Maybe, b: Maybe): Maybe {
    if (a === true || b === true)
        return true
    if (a == null || b == null)
        return null
    return false
}
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   false   null
//  false   |  false  false   false
//  null    |  null   false   null
function min(a: Maybe, b: Maybe): Maybe {
    if (a === false || b === false)
        return false
    if (a == null || b == null)
        return null
    return true
}
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   null    null
//  false   |  null   false   null
//  null    |  null   null    null
function same(a: Maybe, b: Maybe): Maybe {
    return a === b ? a : null
}

/**
 * Assuming expression 'a' is true then this function returns
 * true if 'b' is necessarily true
 * false if 'b' is necessarily false
 * null if we cannot determine
 */
export default function isConsequent(a: Expression, b: Expression): true | false | null {
    if (TypeExpression.is(a)) {
        a = a.value
    }
    if (TypeExpression.is(b)) {
        b = b.value
    }
    if (toCodeString(a) === toCodeString(b)) {
        return true
    }
    if (BinaryExpression.is(a)) {
        if (BinaryExpression.is(b)) {
            if (toCodeString(a.left) === toCodeString(b.left)) {
                if (Literal.is(a.right) && Literal.is(b.right)) {
                    let ar = a.right.value!
                    let br = b.right.value!
                    switch (a.operator) {
                        case '>':
                            switch (b.operator) {
                                case '>=':                                  // > 0 is >= 0, > 1 is >= 0
                                case '!=':                                  // > 0 is != 0, > 1 is != 0
                                case '>':  return ar >= br ? true : null    // > 0 is > 0, > 1 is > 0
                                case '<=':                                  // > 0 isnt <= 0, > 1 isnt <= 0
                                case '==':                                  // > 0 isnt == 0, > 1 isnt == 0
                                case '<':  return ar >= br ? false : null   // > 0 isnt < 0, > 1 isnt < 0
                            }
                            break
                        case '>=':
                            switch (b.operator) {
                                case '>=':                                  // >= 1 is >= 0
                                case '>':  return ar > br ?  true : null    // >= 1 is > 0
                                case '==':                                  // >= 1 isnt == 0
                                case '<=': return ar > br ? false : null    // >= 1 isnt <= 0
                                case '<':  return ar >= br ? false : null   // >= 0 isnt < 0, >= 1 isnt < 0
                            }
                            break
                        case '<':
                            switch (b.operator) {
                                case '<=':                                  // < 0 is <= 0, < -1 is <= 0
                                case '!=':                                  // < 0 is != 0, < -1 is != 0
                                case '<':  return ar <= br ?  true : null   // < 0 is < 0, < -1 is < 0
                                case '>=':                                  // < 0 isnt >= 0, < -1 isnt >= 0
                                case '==':                                  // < 0 isnt == 0, < -1 isnt == 0
                                case '>':  return ar <= br ? false : null   // < 0 isnt > 0, < -1 isnt > 0
                            }
                            break
                        case '<=':
                            switch (b.operator) {
                                case '<=':                                  // <= -1 is <= 0
                                case '<':  return ar < br ?  true : null    // <= -1 is < 0
                                case '==':                                  // <= -1 isnt == 0
                                case '>=': return ar < br ? false : null    // <= -1 isnt >= 0
                                case '>':  return ar <= br ? false : null   // <= 0 isnt > 0, <= -1 isnt > 0
                            }
                            break
                        case '==':
                            switch (b.operator) {
                                case '<=': return ar <= br      // == 0 is <= 0, == 0 is <= 1
                                case '<': return ar < br        // == 0 is < 1
                                case '==': return ar === br     // == 0 is == 0
                                case '>=': return ar >= br      // == 0 is >= 0
                                case '>':  return ar > br       // == 0 is > -1
                                case '!=': return ar != br      // == 0 is != 1
                            }
                            break
                    }
                }
                else if (toCodeString(a.right) === toCodeString(b.right)) {
                    // we can still analyze some comparisons if we know the both right hand operators are the same.
                    switch (a.operator) {
                        case '>':
                            switch (b.operator) {
                                case '>=': case '!=': return true
                                case '<': case '<=': case '==': return false
                            }
                            break
                        case '>=':
                            switch (b.operator) {
                                case '<': return false
                            }
                            break
                        case '<':
                            switch (b.operator) {
                                case '<=': case '!=': return true
                                case '>': case '>=': case '==': return false
                            }
                            break
                        case '<=':
                            switch (b.operator) {
                                case '>': return false
                            }
                            break
                        case '==':
                            switch (b.operator) {
                                case '>=': case '<=': return true
                                case '>': case '<': case '!=': return false
                            }
                            break
                        case '!=':
                            switch (b.operator) {
                                case '==': return false
                            }
                            break
                        case 'is':
                            switch (b.operator) {
                                case 'isnt': return false
                            }
                            break
                        case 'isnt':
                            switch (b.operator) {
                                case 'is': return false
                            }
                            break
                    }
                }
            }
        }
    }
    if (BinaryExpression.is(a) && a.operator === "|") {
        return same(isConsequent(a.left, b), isConsequent(a.right, b))
    }
    if (BinaryExpression.is(b) && b.operator === "&") {
        return min(isConsequent(a, b.left), isConsequent(a, b.right))
    }
    if (BinaryExpression.is(b) && b.operator === "|") {
        return max(isConsequent(a, b.left), isConsequent(a, b.right))
    }
    if (BinaryExpression.is(a) && a.operator === "&") {
        return max(isConsequent(a.left, b), isConsequent(a.right, b))
    }
    return null
}
