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
  - [ ] Don't execute or optimize while compiling.
  - [ ] Finish Type Inference
    - [ ] Function return type
  - [x] We need a map { key -> value } format that is not ambiguous with array destructuring
  - [ ] Maybe... we should see if we need pattern matching and how that works with above