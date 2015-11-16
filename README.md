ion language
========================

Overview
------------------------

Ion is a javascript based reactive language.

The primary goal of the language is to minimize the costs of writing, extending and maintaining a large application.

Most complexity in modern applications relates to the dependencies between the view and the model.  More generically, we can consider both the view and the model to be object structures.  So the general problem is that we have an output structure dependent on an input structure.  When the input structure changes then we need to dynamically update the output structure.  A significant portion of all design patterns are focused on how to handle this problem.

Reactive programming provides the solution to this problem of dependency.  By integrating the ability to write declarative, incrementally reactive template functions directly into our language, we are able to author dynamic and responsive applications using a subset of the same familiar programming constructs that we are using in our current imperative languages.

Syntax
------

The basic syntax is similar to javascript harmony version with an indented structure inspired by coffeescript.

See docs/samples/syntax.html and reactive.html for more information.


Development Setup
_____

Install the latest version of NodeJS
Install bower with
    sudo npm install -g bower
Clone this repository
Change into the ion directory

Run this command to setup the dev environment:
    npm run dev
If that fails, then look at the "dev" script in the package.json and run the commands individually in order, using sudo if needed.  Commands in the script are all separated by &&.

Start the sample server with:
    node server
    Should say "Listening on port 9090"

Browse to http://localhost:9090

