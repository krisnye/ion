ion language
========================

Overview
------------------------

Ion is a javascript based reactive language.

The primary goal of the language is to minimize the costs of writing, extending and maintaining a large application.

Most complexity in modern applications relates to the dependencies between the view and the model.  More generically, we can consider both the view and the model to be object structures.  So the generic problem is that we have an output structure dependent on an input structure.  When the input structure changes then we need to dynamically update the output structure.  A significant portion of all design patterns are focused on how to handle this problem.

Reactive programming provides the solution to this problem of dependency.  By integrating the ability to write declarative, incrementally reactive template functions directly into our language, we are able to author dynamic and responsive applications using a subset of the same familiar programming constructs that we are using in our current imperative languages.

Syntax
------

The basic syntax is similar to javascript harmony version with and indented structure inspired by coffeescript.
		
### Basic Operators

Uses all the same operators as javascript, except for the following logical operators:

* **and** (**&&**)
* **or** (**||**)
* **not** (**!**)
* **is** (**===**)
* **isnt** (**!==**)

### Variable Declaration

Variables are block scoped using either **let** or **const**.

Examples

	# inline
    let x
	let y = 10, z = 9
	const one = 1
	const two = 2
	const three = 3

	# multiline
	let
		x
		y = 10
		z = 9
	const
		one = 1
		two = 2
		three = 3

### Imperative Control Flow

These statements are not allowed within declarative reactive templates.

	while true
		console.log("hello")

	for let i = 0; i < 10; i++
		console.log("loop: " + i)

	try
		doSomethingTricky()
	catch e
		console.error(e)
	finally
		cleanup()

### Declarative Control Flow

	if a is 1
		console.log("a is 1")
	else if a is 2
		console.log("a is 2")
	else
		console.log("something else")

	for number in [1,2,3]
		console.log(number)

	for number, index in [1,2,3]
		console.log(number + index)

	for key of {a:1,b:2,c:3}
		console.log(key)

	for key, value of {a:1,b:2,c:3}
		console.log(key + ":" + value)

### Object declaration