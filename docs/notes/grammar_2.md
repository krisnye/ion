//  Everything is an Expression
Expression = Number | Function | Application | Variable | Reference | Collection | Operation
Function = Expression -> Expression
Application = Function Expression
Variable = Id: Type
Reference = Id
Number = 0 | 1 ...
//  A Type is a function which checks another types intersection with it.
Type = Type -> -1 | 0 | 1
//  An Operation is a built in Function Application
Operation = UnaryOperator Expression | Expression BinaryOperator Expression
UnaryOperator |= + - ! < <= > >= abs sqrt typeof
BinaryOperator |= | * / + - == != < > <= >= min max pow
Collection = Map | Object | Array
Map = { Function* }
Object = ( Variable* )
Array = [ Expression* ]

//  Examples => (Results)
