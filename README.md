ion
===

Indented Object Notation is a YAML inspired, JSON compatible object serialization format that is optimized for human authoring and readability.
Whenever possible, quotes, brackets and escape characters are not required and structure is implied by indentation.

It is especially well suited for [configuration](/krisnye/ion/blob/master/package.ion) files that might otherwise be written in [JSON](/krisnye/ion/blob/master/package.json).


### Installation

	npm install ion

### Usage

#### Command Line

	ion input.ion > output.json

#### Node

	ion = require('ion');
	object = ion.parse(iontext);

#### Web

	<script src="ion-min.js"></script>
	<script>
		object = ion.parse(iontext);
	</script>

### Example ion

		boolean: true              # same format as JSON boolean
		number: 42.5               # same format as JSON number
		string: "42.5"             # same format as JSON string
		explicit null: null        # same format as JSON null
		implicit null:             # empty value is also null
		unquoted: We don't need no stinking quotes.
		date: 2006-12-09           # Date, ISO 8601 format
		time: 2006-12-09T12:30     # Date, ISO 8601 format
		object:                    # same as YAML or Coffeescript
			property one: true
			"quoted property": 10
		inline list: alpha, beta, null, 12, true
		array with single item: [alpha]
		empty array: []
		empty object: {}
		multiline array:
			alpha
			bravo
			charlie
		matrix:                     # array of arrays
			1, 0, 0, 0
			0, 1, 0, 0
			0, 0, 1, 0
			0, 0, 0, 1
		matrix as string: ""
			1, 0, 0, 0
			0, 1, 0, 0
			0, 0, 1, 0
			0, 0, 0, 1
		html:
			<html>
				<head>
					<title>Yes, please.</title>
				</head>
				<body>
					Html requires no escaping either.
				</body>
			</html>
		array of objects:	# recognized as array of objects because of duplicated keys
			name: Kris Nye
			email: kris@gmail.com
			name: John White
			email: bitwhite@gmail.com
		array of objects as table:         # array of objects
			name:            birth day:  age: sex: grade:
			Sadera Michelle  1996-03-08  16   f    11
			Orion Darwin     1998-06-13  14   m    9
			Phoenix Nilsen   2006-07-01  6    m    1
			Galileo Zyler    2010-03-23  2    m		

### Equivalent JSON

	{
        "boolean": true,
        "number": 42.5,
        "string": "42.5",
        "explicit null": null,
        "implicit null": null,
        "unquoted": "We don't need no stinking quotes.",
        "date": "2006-12-09T00:00:00.000Z",
        "time": "2006-12-09T12:30:00.000Z",
        "object": {
            "property one": true,
            "quoted property": 10
        },
        "inline list": [
            "alpha",
            "beta",
            "null",
            "12",
            "true"
        ],
        "array with single item": [
            "alpha"
        ],
        "empty array": [],
        "empty object": {},
        "multiline array": [
            "alpha",
            "bravo",
            "charlie"
        ],
        "matrix": [
            [
                "1",
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "1",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "1",
                "0"
            ],
            [
                "0",
                "0",
                "0",
                "1"
            ]
        ],
        "matrix as string": "1, 0, 0, 0\n0, 1, 0, 0\n0, 0, 1, 0\n0, 0, 0, 1",
        "html": "<html>\n\t<head>\n\t\t<title>Yes, please.</title>\n\t</head>\n\t<body>\n\t\tHtml requires no escaping either.\n\t</body>\n</html>",
        "array of objects": [
            {
                "name": "Kris Nye",
                "email": "kris@gmail.com"
            },
            {
                "name": "John White",
                "email": "bitwhite@gmail.com"
            }
        ],
        "array of objects as table": [
            {
                "name": "Sadera Michelle",
                "birth day": "1996-03-08T00:00:00.000Z",
                "age": 16,
                "sex": "f",
                "grade": 11
            },
            {
                "name": "Orion Darwin",
                "birth day": "1998-06-13T00:00:00.000Z",
                "age": 14,
                "sex": "m",
                "grade": 9
            },
            {
                "name": "Phoenix Nilsen",
                "birth day": "2006-07-01T00:00:00.000Z",
                "age": 6,
                "sex": "m",
                "grade": 1
            },
            {
                "name": "Galileo Zyler",
                "birth day": "2010-03-23T00:00:00.000Z",
                "age": 2,
                "sex": "m"
            }
        ]
	}

