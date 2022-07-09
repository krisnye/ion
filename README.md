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
  - [x] Implement Meta property binding to adjacent nodes.
  - [ ] Do initial type inference WITHOUT constraints yet.
  - [/] Add Javascript Operations for Interpreting.
  - [x] Handle _slash as encoding for `/`
  - [x] Figure out why Division result is yielding Float from Integer math
  - [x] Figure out why Float Division is being called

  - [x] Remove IntegerLiteral/FloatLiteral, use NumberLiteral with integer property.
  - [x] Number TypeInference
    - [x] - a
    - [x] a / b
    - [x] a % b
    - [x] sqrt
    - [x] sin
    - [x] cos
    - [x] tan

  - [x] Most Type Inference can be done exclusively in single files + dependents.
  - [x] Object Type to use Map
  - [x] toComparisonType to simplify all objects to an ObjectType.
  - [-] NumberType needs min/max to use POSITIVE_INFINITY or NEGATIVE_INFINITY.
  - [x] Static Single Assignment?
    - [x] How to infer the PHI functions of re-merging variable type after block?
  - [x] Need separate DeclaredType and InferredType on Variables.
  - [x] Restore unit tests.
  - [x] Conditional Declarations => Inferred Types
  - [x] For loop SSA Form.
  - [ ] Semantic checks.
  - [ ] Add NaN class to represent Not A Number.
  - [ ] Overload Float division to explicitly return NaN if necessary.
  - [x] class inheritance for type checking
  - [ ] class instance functions to static functions

  - [x] Scope functions globally in Assembly phase.
    - [x] Need to separate named multi functions from local variables.
    - [x] Must convert everything into assembly space.
    - [x] Remember to favor simplest possible approach!
    - [x] Maybe consider removing MultiFunction and just returning Array??
    - [x] Named functions names should NOT be renamed to global scope.
  - [x] Create specific function types from inferred functions.
    - [x] Create Concrete Functions
    - [x] Resolve calls correctly. Next step.
    - [x] Fix DAG sharing nodes.
  - [/] Conditional Type Assertions
    - [x] Inter-parameter checking
      - [x] Instead of renaming per function check, let's use a unified parameter naming
      - [x] _param_1, _param_2, _param_3, _param_4...
    - [x] Array bounds checking
      - [x] Why is accessing Array[0] working?
      - [x] Type && Array checking is not right yet... FFS.
    - [?] Chained Conditional Type, check property
  - [x] Check and re-order named function arguments semantically.
  - [ ] Start adding some useful basic semantic checks.
  - [x] UFCS conversion to static call.
  - [ ] MultiFunction runtime dispatch algorithm.
