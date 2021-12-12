
Number
Expression = Number | Function | Operation | ( Expression )
Function = Expression -> Expression
Operation = Function Expression | UnaryOp Expression | Expression BinaryOp Expression
Variable = Id : Type | Id = Expression | Id : Type = Expression
Collection = Object | Map | Array
Object = ( Variable* )
Map = ( Function* )
Array = [ Expression* ]
