ion
===

Indented Object Notation

### package.ion

	name: ion
	preferGlobal: false
	version: "0.2.1"
	created: 2012-08-06		# ISO 8601 dates are instantiated as new Date objects
	author: Kris Nye <krisnye@gmail.com>
	description:
		Indented Object Notation parser.
		Simple JSON like object notation inspired by Coffeescript and YAML.
		Optimized for human authoring and reading.
	contributors:
		name: Kris Nye
		email: krisnye@gmail.com
		name: John Weiss
		email: bitweiss@gmail.com
	bin: {}
	scripts:
		glass: node ./parser.js
	main: ./ion
	repository:
		type: git
		url: https://github.com/krisnye/ion.git
	keywords: ion, JSON, YAML, Coffee, Coffeescript
	#dependencies: {}
	noAnalyze: true
	bundleDependencies: []
	license: MIT
	engine:
		node: >=0.4

is equivalent to the following json

### package.json

	{
	    "name": "ion",
	    "preferGlobal": true,
	    "version": "0.2.1",
	    "created": "2012-08-06T00:00:00.000Z",
	    "author": "Kris Nye <krisnye@gmail.com>",
	    "description": "Indented Object Notation parser.\nSimple JSON like object notation inspired by Coffeescript and YAML.\nOptimized for human authoring and reading.",
	    "contributors": [
	        {
	            "name": "Kris Nye",
	            "email": "krisnye@gmail.com"
	        },
	        {
	            "name": "John Weiss",
	            "email": "bitweiss@gmail.com"
	        }
	    ],
	    "bin": {},
	    "scripts": {
	        "glass": "node ./parser.js"
	    },
	    "main": "./ion",
	    "repository": {
	        "type": "git",
	        "url": "https://github.com/krisnye/ion.git"
	    },
	    "keywords": [
	        "ion",
	        "JSON",
	        "YAML",
	        "Coffee",
	        "Coffeescript"
	    ],
	    "noAnalyze": true,
	    "bundleDependencies": [],
	    "license": "MIT",
	    "engine": {
        "node": ">=0.4"
    }
}
