
JSON stands for Javascript Object Notation.  It has become the new standard for data transfer on the internet.  The main reason is because it is much simpler to read and write both for humans and for computers than XML which it replaced.

It looks like this:

    {
        "surname": "Smiths",
        "members": [
            {
                "name": "Joe",
                "age": 34,
                "male": true
            },
            {
                "name": "Lisa",
                "age": 31,
                "male": false
            }
        ]
    }

Another advantage is that it is arbitrarily nestable, unlike a traditional flat-database which can only contain one layer of fields.  JSON data can contain objects that contain objects that contain arrays that contain objects that contain fields... as deep as you need.

This data representation has become so ubiquitous that we have even begun creating databases that are designed to store it natively.  (Mongo for instance).

The format is VERY easy for a computer to read and write, and fairly easy for a human to read and write. There are some alternative formats that are even easier for humans to read and write and more difficult for computers to read and write.

Here is the same data represented in coffeescript. You can think of this as CSON. This example happens to also be valid YAML which is a third way of representing data:

    surname: "Smiths"
    members: [
        {
            name: "Joe"
            age: 34
            male: true
        }
        {
            name: "Lisa"
            age: 31
            male: false
        }
    ]

You can see that there are less commas, quotes and brackets (often referred to derogatorily as 'braket soup').  We use the indentation level to imply the nesting relationships.

In the real world, we usually need to know what "type" things are.  In this example, we would probably want to have two different types or objects in our system.  "Family" and "Person".  These might correspond to classes in a programming language and/or Tables in a database.

JSON has no native way to represent 'Type', so we would just store it in a special field like this:

    {
        "$type": "Family",
        "surname": "Smiths",
        "members": [
            {
                "$type": "Person",
                "name": "Joe",
                "age": 34,
                "male": true
            },
            {
                "$type": "Person",
                "name": "Lisa",
                "age": 31,
                "male": false
            }
        ]
    }

Coffeescript would look similar, or it could actually call the constructors which would look something like this:

    new Family
        surname: "Smiths"
        members: [
            new Person
                name: "Joe"
                age: 34
                male: true
            new Person
                name: "Lisa"
                age: 31
                male: false
        ]

The format I am using to represent this typed data looks like this:

    Family
        surname: "Smiths"
        members:
            Person
                name: "Joe"
                age: 34
                male: true
            Person
                name: "Lisa"
                age: 31
                male: false

I call this format ION (Indented Object Notation).  It is clean, simple and supports all JSON data types as well as storing custom object "type" information.

Now let's pretend that we have to build a second data structure based upon information in the first data structure.  For instance, we want to build a house which is just right for this family.  Regular imperative code can do this just fine.  The problem is how do we change the house when a new family member is born?  We have to discard the original house and run the imperative code again rebuild a brand new house.

In the real world it is pretty expensive to rebuild an entire house from scratch.  In the programming world it's the same.  Here the "house" is usually an HTML/DOM structure, and rebuilding it from scratch takes a long time and usually will mess up where you were at.  We really need a way to reactively respond to changes in the underlying data and INCREMENTALLY rebuild just the part of the house that is necessary.  If a new baby is born, then we just add a room and leave the rest of the house intact.  If a member moves out of the house, then we just remove a single room from the house still leaving the rest untouched.

Here is my take at a reactive, incremental template language that can specify how to do this.  It looks like ION from above, but with the addition of programming expressions and some control flow.

    House
        name: @name
        rooms:
            Room
                name: "Kitchen"
                size: 500
            Room
                name: "Living Room"
                size: 500 + @members.length * 100
            for @members
                Room
                    name: .name + " Room"
                    size:
                        if .male
                            800
                        else
                            1000

This is a template for creating custom homes for families.  Every family will get a home with a room for each member and a large enough family room for everyone.

Our templates are:
    Reactive: When the family changes the house automatically changes.
    Incremental: The house only changes the parts that need to change.
    Generic: We are not just limited to html or user interfaces as output.

The family and house are provided to make thinking about this easier.  In our application the "family" will actually be Projects and Tasks, and the "home" will really be an HTML user interface.