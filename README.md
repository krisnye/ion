ion
===

Indented Object Notation

### sample.ion (538 bytes)

	name: ion
	version: 0.2.1
	created: 2012-08-06
	meta:
		description: Indented Object Notation = JSON Optimized for humans, not machines.
		keywords: ion, JSON, YAML, Coffee, Coffeescript
		html:
			<div class=ion>
				Html does not have to be escaped.
			</div>
	people:
		name             birth day   age  sex  grade
		--------------------------------------------
		Sadera Michelle  1996-03-08  16   f    11
		Orion Darwin     1998-06-13  14   m    9
		Phoenix Nilsen   2006-07-01  6    m    1
		Galileo Zyler    2010-03-23  2    m

is equivalent to the following json

### sample.json (1048 bytes)

	{
	   "name": "ion",
	   "version": "0.2.1",
	   "created": "2012-08-06T00:00:00.000Z",
	   "meta": {
	      "description": "Indented Object Notation = JSON Optimized for humans, not machines.",
	      "keywords": [
	         "ion",
	         "JSON",
	         "YAML",
	         "Coffee",
	         "Coffeescript"
	      ],
	      "html": "<div class=\"ion\">\n\tHtml does not have to be escaped.\n</div>"
	   },
	   "people": [
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
