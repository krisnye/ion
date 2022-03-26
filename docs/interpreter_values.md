# Interpreter Value Data Model

## Type Id

    "string.full.path.to.type"

## Class Id

    Same as Type Id but always refers to a concrete class.

## Instance

    { type: ClassId, value }

## Object Value

    { prop1: Instance, prop2: Instance, ... }

## Arrays

    [ Instance1, Instance2, Instance3 ]

## Integers

    ... -2, -2, 0, 1, 2 ...

## Floats

    - infinity ... + infinity

## Strings

    "string here"
