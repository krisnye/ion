
## Multifunction Precedence

More specific functions have higher precedence.
The more specific the parameter types are the more specific the function is.
We can think of specificity as similar to resistance in an electrical circuit.
A higher resistance let's less current through.
A higher specificity let's less instances through.

Type => Resistance or Specificity where greater is higher.

## Requirements

- Must be able to sort functions by precedence without reference to types called with.

## Any Constraint

Any => -1

## Object Constraint

ClassA => 1

ClassA | ClassB => 1 / (1 / 1 + 1 / 1) => 1 / 2

TypeA | TypeB => 1 / (1 / TypeA.resistance + 1 / TypeB.resistance)

ClassA & ClassB => 1 + 1 = 2

TypeA & TypeB => TypeA.resistance + TypeB.resistance

### Object Property Constraint

ClassA( fieldA: >= 0 ) => 1 + (fieldA type).resistance

## Number Constraint

maxPos = 1000000
maxNeg = - maxPos
maxRange = maxPos - maxNeg
min = 1 / maxRange

Number => 1

+ any other constraints

    > 0 => 0 > .. maxPos => (maxRange - (maxPos - 0)) / maxRange + min => 0.5 + min
    >= 0 => 0 > .. maxPos => (maxRange - (maxPos - 0)) / maxRange => 0.5

    1.5 | 2.5 => 1 - min * 2

Integer => 2

+ any other constraints

    count all possible value up to max range
    => 1 - min * count

## Array Constraint

ClassA[] => ClassA.resistance