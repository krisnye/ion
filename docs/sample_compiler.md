
    //  source  /////////////////////////////////////////////////////////////////////////
    class Integer
    class Float
    [Native]
    `+` = (a: Integer, b: Integer): Integer => 0
    [Native]
    `+` = (a: Float, b: Float): Float => 0.0
    result = 1.0 + 2.0
    /////////////////////////////////////////////////////////////////////////////////////

    //  parsed  /////////////////////////////////////////////////////////////////////////
    const Integer = Class()
        id = "Integer"
    const Float = Class()
        id = "Float"
    const `+` = MetaFunction()
        nodes = []
            Function(id=`+`,meta={Native=()})
                parameters = []
                    Variable(id=Identifier(name="a"),type=TypeReference(name="Integer"))
                    Variable(id=Identifier(name="b"),type=TypeReference(name="Integer"))
            ... "Float"
    const result = Call()
        callee=Reference(name=`+`)
        args: [Instance(type="Float",value=1.0),Instance(type="Float",value=2.0)]
    /////////////////////////////////////////////////////////////////////////////////////

