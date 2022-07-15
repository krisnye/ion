
## ! Postfix Variable Reassignment Operator

Use ! postfix operator to indicate a variable reassigning operation.

```typescript
    array = [1, 2, 3]
    last = array!pop()
    //  as syntactic sugar for
    last = [array, value] = array.pop() ; value
```

## : Postfix Variable Reassignment Operator

Use : postfix operator to indicate a variable reassigning operation.

```typescript
    array = [1, 2, 3]
    last = array:pop()

    array = [1, 2, 3]
    last = pop(array:, other:)  //  the trailing : is confusing and overloads : type
```

## & Variable Reassignment Operator

Use & prefix operator to indicate a variable reassigning operation.

```typescript
    array = [1, 2, 3]
    last = &array.pop()

    array = [1, 2, 3]
    last = &array.pop(&other)
```

This is probably the best.

## ; Operator no sugar.

```typescript
    array = [1, 2, 3]
    [array, last] = array.pop()
    [array, last] = array.pop() ; last

    array = [1, 2, 3]
    last = &array.pop(&other)
```
