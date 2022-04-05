# ion
Cross platform modeling language
  Pure functional
  Multiple inheritance
  Immutable semantics
  Dependent types

# TODO

  - [x] define global reference format
  - [x] convert external references to absolute references
  - [x] sort expressions by type dependency
  - [x] figure out how to handle infer types which are not dependent on
    - [x] add implicit Number reference to literals (and String reference)
    - [x] make Void node
    - [x] move "pre-infer-types" to semantic analysis phase.
  - [x] simplify and normalize can be done without an evaluation context
  - [x] evaluate requires an evaluation context
  - [x] do we still have || and | => We only need | since it works on booleans
  - [/] calculate expression types
  - [ ] figure out why For loop parsing is not working
  - [x] reference older inferTypes as we reimplement new inferTypes
  - [x] continue type inference till function argument checking is working
  - [x] implement new type isConsequent logic
  - [x] test new type isConsequent logic
  - [x] remove and replace old isConsequent logic with new
  - [x] infer a type for a class: Function & static properties...
  - [x] need proper global unified namespace
  - [x] fix so Number is exporting a class and not `Number = <= 0 | >= 0`
  - [x] outline object expressions should create scope and properties should declare
  - [-] interpreter
  - [x] Convert to string based comparison so AST looks human readable language
    - [x] test this now with current json diff
    - [x] Implemented a good string diff library
  - [x] Don't execute or optimize while compiling.
  - [ ] Finish Type Inference
    - [x] Function return type
    - [x] min operator
    - [x] max operator
    - [x] * operator
    - [x] / operator
    - [x] % operator
    - [x] abs operator
    - [x] inv operator
    - [x] ** operator
    - [ ] Conditional
      - [-] Scalar Conditionals
      - [-] Vector Conditionals (within Array)
      - [X] Maybe only use SpreadType or single Type.
  - [x] array bounds checking
    - [x] getting declarator in Array, but can't find scope
  - [x] convert Meta properties to Meta classes
  - [x] we need dependency scopes to find declarations, at LEAST for exported functions and classes.
  - [x] We need template Types
  - [x] get function for indexers on Array and other things
  - [?] it seems that Variable type is being set on changes AFTER other inference
  - [x] We need a map { key -> value } format that is not ambiguous with array destructuring
  - [-] Maybe... we should see if we need pattern matching and how that works with above
  - [ ] class instance functions to static functions
  - [ ] class inheritance
  - [ ] uniform function call syntax
  - [ ] refactoring
    - [-] UnionType to left/right operation
    - [-] IntersectionType to left/right operation
    - [ ] create normalized Type so Union of ObjectType or NumberType

# Todo 22

  - [ ] Semantic Checking for valid expressions
    - [x] Variable Declaration
    - [x] Class Declaration
    - [x] Function Declaration
    - [x] Variable Assignment
    - [x] Destructuring Assignment
    - [-] Object Literal (Anonymous Type)
            Object(foo = 1, bar = 2)
    - [-] Array Literal
            Array(Type, Value, Length1, Length2?, Length3?)
            Syntax
              Integer[0, length = 12]
    - [-] For Loop
    - [-] Expression (Only valid within an outline expression, otherwise it's a no-op)
  - [x] Port over Semantic Error Messages.
  - [x] Implement Outline String expressions.
  - [ ] Implement Meta property binding to adjacent nodes.
  - [ ] Add Javascript Operations for Interpreting.

