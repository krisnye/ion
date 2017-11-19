
limitations on 'let' variables:
    a 'let' variable should only be composed of variables which can NOT be modified from within the let variables scope.

    var x = 10
    let y = x * 2
    x := 20
    // this is confusing because now y = 20 when x * 2 implies y should be 40
