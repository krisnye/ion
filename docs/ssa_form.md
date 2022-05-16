
    //  initial function
    func = (a: -10.0 .. < 0.0 | > 0.0 .. 10) =>
        if a < 0.0
            a *= 3.0
        else
            a *= 4.0
        return a * 2.0

    //  insert conditionals
    func = (a: -10.0 .. < 0.0 | > 0.0 .. 10) =>
        if a < 0.0
            cond a: -10.0 .. < 0.0
            a = a * 3.0
        else
            cond a: > 0.0 .. 10.0
            a = a * 4.0
        return a * 2.0

    //  static single assignment
    func = (a: -10.0 .. < 0.0 | > 0.0 .. 10) =>
        if a < 0.0
            cond a.1: -10.0 .. < 0.0
            const a.2 = a.1 * 3.0
        else
            cond a.3: > 0.0 .. 10.0
            const a.4 = a.3 * 4.0
        cond a.5: typeof a.2 | typeof a.4
        const a.6 = a.5 * 2.0
        return a.6

    //  type inference
    func = (a: -10.0 .. < 0.0 | > 0.0 .. 10) =>
        if a < 0.0
            cond a.1: -10.0 .. < 0.0
            const a.2: -30.0 .. < 0.0 = a.1 * 3.0
        else
            cond a.3: > 0.0 .. 10.0
            const a.4: > 0.0 .. 40.0 = a.3 * 4.0
        cond a.5: -30.0 .. < 0.0 | > 0.0 .. 40.0
        const a.6: -60.0 .. < 0.0 | > 0.0 .. 80.0 = a.5 * 2.0
        return a.6 : -60.0 .. < 0.0 | > 0.0 .. 80.0

    //  we calculate our function return type as: -60.0 .. < 0.0 | > 0.0 .. 80.0
