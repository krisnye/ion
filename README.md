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
  - [ ] reference older inferTypes as we reimplement new inferTypes
  - [x] continue type inference till function argument checking is working
  - [ ] implement new type isConsequent logic
  - [ ] test new type isConsequent logic
  - [ ] remove and replace old isConsequent logic with new
