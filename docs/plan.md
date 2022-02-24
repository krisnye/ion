
# 2022 Plan

## Implement New Hand Parser

- [x] Implement Tokenizer
- [x] Operator Precedence Parsing

## Dramatically Simplify AST Format

- Call
- Class
- Function
- Variable
- Assignment
- If
- For
- Array
- Object
- Reference

## Changes to existing system

- [x] Remove Patterns early in parsing and use simple Declarations.
- [ ] All operators are defined in root namespace and can be extended.
- [ ] All operators can operate on any type defined for them.
- [ ] Use same operators for Type operations.
- [ ] Define core operator return types using metadata.

## Design Intermediate Representation

- [ ] output from compiler front end
- [ ] input to compiler back end
- [ ] contains external API information
- [ ] contains source map information
- [ ] could be used by interpreter

## Design the Interpreter Value Model

- [ ] Just use the Ast model for interpretation, with special handling of Reference.
- [ ] Bootstrap an interpreter BEFORE we can use meta properties to provide native overrides.

## Build the Initial Interpreter

The first interpreter will NOT handle any type constraints, only class based invocation.

## Build type system IN language

    Types have to be evaluated at compile time. How do we do that?
    `..` = (a, b) => Interval(a, b)
    type = 1 .. 2 | 3 .. 4
