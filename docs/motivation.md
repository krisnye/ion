The Motivation behind Ion
=========================

Minimize the development, maintenance and extension costs for large applications.

A brief history of web development
----------------------------------

### 1st Generation: cgi-scripts

This sucked.

### 2nd Generation: Servlets

This sucked less.

### 3rd Generation: Server Pages

This actually made writing pages easy, provided that your application didn't get too complex, or need to reuse stateful components.

The database was your model.  The page logic would use the model to write out an html view.

    <%
	if (request.method == "POST") {
        // put new value into database, effectively changing our model.
	}
	//	get our data model
	List<String> names = database.query(..);
	%>
	<html>
		<body>
		<% for (int i = 0; i < names.length; i++) { %>
			<div>Hello <%= names[i] %></div>
		<% } %>
		<form>
			Add a new name: <input name="name">
			<input type="submit">
		</form>
		</body>
	</html>

Still, there were several drawbacks:

 * It's difficult to make reusable components.  They have to track individual state across requests, witness the complexity of asp.net that resulted from this.
 * You must refresh the entire page any time ANYTHING changes, which is very slow.
 * You must query the entire data model any time the page is re-rendered.  You can try to cache data, but that usually creates more problems than it solves.

### 4th Generation: Client side Javascript and AJAX

The client side uses AJAX to load the model and then writes the html.

	<html>
		<body>
		<script>
		var names = ajax.get("/data/names");
		for (var i = 0; i < names.length; i++) {
			names.innerHTML += "<div>Hello " + names[i] + "</div>"
		}
		function addName(name) {
			// update our model on the server.
			ajax.post("/data/names", name);
			//	now we also need to update our view on the client
			names.innerHTML += "<div>Hello " + name + "</div>"
		}
		</script>
		<div id="names">
		</div>
		<form onsubmit="addName(name.value); return false;">
			Add a new name: <input name="name">
			<input type="submit">
		</form>
		</body>
	</html>

This works and finally enabled us to build sophisticated and responsive web applications.

There are still some large problems with this model though.  One problem is that the content is not indexable by spiders unless they execute javascript which they are only starting to do recently.

The other problem is much more serious, and it grows exponentially as the application becomes more complex.

If you look at the above example, you can see that we have two places where we have to render a name.  First, when we load the data.  Second, when we dynamically add new data.  Sure, we could enclose that specific rendering code in a function and reuse it.  Now imagine that we want to edit a specific name in the list.  Now things get more complex.  We must track the elements in our html, go and find the element that contains the original value and then modify it to use the new value.

In the previous generation, things were simple.  There was only a single place where all rendering was concisely declared.  Every time the data model changed, we would re-render everything.  The data model and the html view were always in perfect sync.  Now though, we potentially have to track every single location in our application that contains dynamic data and then update that location whenever our data changes.

It obviously doesn't scale to have every section where we modify the model also be aware of every part of the application that might need to be updated.  That would also deeply couple our data API to our rendering code.

The most common solution to this problem has been to use an observer pattern on our data changes.  This allows any UI component to add an event listener so that it can be notified of changes.

That solution is still not perfect:
  
*  It requires our entire data model to be wrapped by methods that can intercept changes.
*  What happens when parts of our UI are dependent on values which don't come from our data model?
*  It STILL requires any dynamic component to exert effort into watching dependencies and re-rendering sections on changes, while keeping the re-rendered sections small enough to not inhibit performance of the page.

This leads us to the next generation.

### 5th Generation: Reactive Client Applications

Almost all of the major frameworks have recognized the above problems with large application development and they've all embraced reactive approaches to solve it.

The basic idea is to write your user interface in a declarative templating language.  Underneath the template, all values that can change will be watched and those sections will be re-rendered "reactively" in response to any changes.

It's also worth noting that all the frameworks are also "incremental".  They try to change only the smallest fragment of the DOM that they can.  Sure, you could re-render the entire page and still be reactive, but you wouldn't be responsive and you would lose any of the users current selection/focus/scrolling/input state.

I will briefly describe most noteworthy frameworks along with my view of their strengths and weaknesses.

##### AngularJS

	<script>
	var phonecatApp = angular.module('phonecatApp', []);
	
	phonecatApp.controller('PhoneListCtrl', function ($scope) {
	  $scope.phones = [
	    {'name': 'Nexus S',
	     'snippet': 'Fast just got faster with Nexus S.'},
	    {'name': 'Motorola XOOM™ with Wi-Fi',
	     'snippet': 'The Next, Next Generation tablet.'},
	    {'name': 'MOTOROLA XOOM™',
	     'snippet': 'The Next, Next Generation tablet.'}
	  ];
	});
	</script>
	<body ng-controller="PhoneListCtrl">
	
	  <ul>
	    <li ng-repeat="phone in phones">
	      {{phone.name}}
	      <p>{{phone.snippet}}</p>
	    </li>
	  </ul>
	
	</body>

Weaknesses:

* Control flow logic embedded in html.  Html and logic don't mix.  Never have.  You either make the html suck by putting it in code or you make the code suck by putting it into html.
* Huge learning curve:  [https://docs.angularjs.org/tutorial](https://docs.angularjs.org/tutorial)
* Only solves reactive dependencies for the specific case of html user interfaces.

Reactive dependencies are actually a general problem in all areas of stateful software development.  It's not just a problem of a View being dependent upon a model.  We often have some properties in the Model dependent upon properties in other parts of the Model.  We can even view a build process as a reactive dependency problem.  The output file structure is dependent upon the state of the input file structure.  With a generic reactive solution to object dependencies we should be able to solve all these problems. 

##### Ember

	<!--- ... additional lines truncated for brevity ... -->
	<script>
		//	models require using custom object wrappers.
		Todos.Todo = DS.Model.extend({
		  title: DS.attr('string'),
		  isCompleted: DS.attr('boolean')
		});
		Todos.TodosRoute = Ember.Route.extend({
		  model: function() {
		    return this.store.find('todo');
		  }
		});
	</script>
	<ul id="todo-list">
	  {{#each}}
	    <li>
	      <input type="checkbox" class="toggle">
	      <label>{{title}}</label><button class="destroy"></button>
	    </li>
	  {{/each}}
	</ul>
	<!--- ... additional lines truncated for brevity ... -->

Weaknesses:

* Control flow logic embedded in HTML.
* Large learning curve: [http://emberjs.com/guides/getting-started/](http://emberjs.com/guides/getting-started/)
* Only solves reactive dependencies for html user interfaces.
* Requires all models to extend from ember Model base class.

Requiring models to extend from a proprietary base class is extremely problematic.  Do you have another layer of plain objects underneath the model classes?  Where do you put any logic?  If you put it into the Model classes then are you requiring anyone who wants to consume just your api to import Ember?  What if my UI is dependent on something that cannot be wrapped in a Model, for instance, I may want a component display to be dependent upon the width of its element.  This is a very common requirement if you are building responsive UI.

##### Polymer

	<link rel="import" href="/components/polymer/polymer.html">
	<polymer-element name="age-slider">
	  <template>
	    This is <b>{{owner}}</b>'s age-slider.
	    <b>{{name}}</b> lets me borrow it.
	    He likes the color <span style="color: {{color}}">{{color}}</span>.
	    I am <b>{{age}}</b> years old.
	    <p><label for="ageInput">Age:</label>
	    <input id="ageInput" type="range"
	           value="{{age}}">
	    <label for="nameInput">Name:</label>
	    <input id="nameInput" value="{{name}}"
	           placeholder="Enter name..."></p>
	  </template>
	  <script>
	    Polymer('age-slider', {
	      age: 25,
	      name: "Daniel",
	      color: "red",
	      owner: "Eric",
	      nameChanged: function() {
	        if (this.name) {
	          // Insure name is capitalized
	          this.name = this.name[0].toUpperCase() +
	                      this.name.slice(1);
	        }
	      }
	    });
	</script>
	</polymer-element>

Strengths:

* Uses many upcoming web standards and provides shims for them where possible.
* Web components are a new standard, so effort into creating and using them is not likely to be a long term waste of effort.
* Model can be regular javascript objects.

Weaknesses:

* Template loop iteration only operates on arrays.  Should be able to iterate over key/value pairs of objects.
* Control flow logic embedded in HTML.
* Only solves reactive dependencies for html user interfaces.
* Everything is an element!? Treat everything as an element and then you have to pass all properties as attributes.  Why exactly is an AJAX helper an element???  [http://www.polymer-project.org/docs/start/usingelements.html](http://www.polymer-project.org/docs/start/usingelements.html)

Here is there own example from the above link that demonstrates the problem of treating everything as an element.

    <roster-list persons='[{"name": "John"}, {"name": "Bob"}]'></roster-list>

HTML and JSON do not mix well together.

##### React.js

	/** @jsx React.DOM */
	
	var LikeButton = React.createClass({
	  getInitialState: function() {
	    return {liked: false};
	  },
	  handleClick: function(event) {
	    this.setState({liked: !this.state.liked});
	  },
	  render: function() {
	    var text = this.state.liked ? 'like' : 'unlike';
	    return (
	      <p onClick={this.handleClick}>
	        You {text} this. Click to toggle.
	      </p>
	    );
	  }
	});
	
	React.renderComponent(
	  <LikeButton />,
	  document.getElementById('example')
	);

Strengths:

* They DO NOT shoehorn templating logic into html.

Weaknesses:

* Proprietary and extremely limited JSX language.  Language is tied explicitly to their html element creation framework.
* Moderately complex learning curve.
* Imperative javascript templating functions.
* Only attempts to solve reactive dependencies for HTML user interfaces.

Imperative templates means that they have no choice but to re-render an entire function if any part of it changes.  Since you can nest functions, that means that you are potentially re-rendering the entire page when one partial input changes.  This is a huge problem, which they *solve* by introducing the Virtual DOM.  The Virtual DOM is basically an abstraction over the regular DOM.  They use a differencing algorithm to resolve changes made to the Virtual DOM and then apply only incremental changes to the actual DOM.  This is a very bad thing.  The Virtual DOM is intimately aware of the standard elements and attributes of the actual DOM.  What if you are targeting a new browser that exposes some new attributes that the Virtual DOM is unaware of?  Will you be able to set those values?  Does someone have to continue to update, extend and maintain this Virtual DOM codebase as the actual DOM evolves???

### Introducing ION

	# Import html elements
	const {div,span,input,a,form,table,tbody,thead,tr,td,button} = import 'ion/browser/elements'
	
	# Traditional imperative function
	const formatDate(date) ->
	    const pad(n) -> n < 10 ? "0" + n : "" + n
	    if not date?
	        return ""
	    if typeof date is 'string'
	        date = Date.parse(date)
	    if typeof date is 'number'
	        date = new Date(date)
	    return "{{pad(date.getFullYear())}}-{{pad(date.getMonth())}}-{{pad(date.getDate())}} {{pad(date.getHours())}}:{{pad(date.getMinutes())}}:{{pad(date.getSeconds())}}"
	
	# Declarative reactive function
	export template ({data,task}) ->
	
	    return tr()
	        style:
	            color: task.complete ? 'red' : null
	        td()
	            input()
	                type: 'checkbox'
	                checked: task.complete
	                change ->
	                    task.complete = @checked
	        td()
	            style:
	                textDecoration: task.complete ? 'line-through' : null
	            task.name
	        td()
	            button()
	                style:
	                    fontSize: "0.7em"
	                click ->
	                    delete data.Task[task.key]
	                    document.querySelector("*[autofocus]").focus()
	                "delete"
	        td()
				if task.created?
		            formatDate(task.created)
	        td()
				if task.updated?
		            formatDate(task.updated)
			td()
				for comment in task.comments
					div()
						comment

Ion is a new language that supports creating incrementally reactive template functions natively.

* Syntax is inspired by CoffeeScripts indented notation but adheres as closely to EcmaScript 6 constructs as possible.
* Regular imperative functions and reactive declarative template functions share the same syntax, with a few constructs (throw,while,for(;;)) not available from within templates.
* Seamless interaction between imperative and declarative code.  In the above code example, the declarative template is using tr/td variables that were declared in imperative code at the top and the imperative click event handler is using the task variable defined within the enclosing declarative template function.
* General solution to all inter-object dependencies.  This example is directly creating and manipulating the DOM, but the language is completely ignorant of the DOM.  The td/tr functions are just helpers that call document.createElement('td') for you and return the result.  You can just as easily use this to create JSON objects, a WebGL scene graph or anything else.  By treating the file system as just another dependent structure, we are able to use a reactive template to define our own incremental source build system.
* Almost no learning curve.  Our templates use just a subset of the control flow structures that all javascript developers are already familiar with.  There is no complicated framework to learn.
* Object declaration syntax is integrated with control flow syntax.  Example, these statements all result in the same output.

		let digits = [0,1,2,3,4,5,6,7,8,9,10]

		let digits = []
		for (let i = 0; i <= 10; i++)
			digits.push(i)

		let digits = []
			# the indentation implies these are items to add to the above array object
			0
			1
			2
			3
			4
			5
			6
			7
			8
			9
			10
			# if/else control flow structures are fine in object declarations
			if weNeedThatExtraPushOverTheCliff
				11

		let digits = []
			# for loops are fine as well
			for (let i = 0; i <= 10; i++)
				i

So how does a reactive template actually work?  Basically, you can "watch" the result of a reactive function and if any of the inputs to the function change later, the output result of the reactive function will change automatically, and incrementally.  Incrementally means that only the portion of the output object that needs to be changed will change, the rest will stay the same.

So, given this example function:

    let translate = (point, translation) ->
		return {x: point.x + translation.x, y: point.y + translation.y}

	let point = {x:1,y:2}
	let translation = {x:10,y:10}
	let result = translate(point, translation)
	console.log(result)
	# -> {x:11,y:12}
	point.x = 5

No matter what future changes we make to point or translation, the result will never change. 

Now let's make the above function a reactive template:

    let translate = template (point, translation) ->
		return {x: point.x + translation.x, y: point.y + translation.y}

	let point = {x:1,y:2}
	let translation = {x:10,y:10}
	new translate(point, translation).watch( (result) -> console.log(result) )
	# -> {x:11,y:12}
	point.x = 5
	# -> {x:15,y:12}

### Summary

Writing applications is even easier than it was in the 3rd generation.  You simply write declarative functions that you can reuse and nest as much as you like.  You can still use any regular javascript imperative functions.  Your input model can be any object you want, including current DOM state or global variables.  The resulting DOM state is always kept up to date in response to input model changes.

Maintenance costs with traditional imperative applications typically rise exponentially as a function of application size.  Eventually, maintenance costs consume all of the available development time and progress halts completely.  This usually happens 2-5 years after initial development.  Throwing more developers at the problem only works for a short time, but makes things even worse in the long run.

With a reactive and declarative application, maintenance costs will only be proportional to the size of the code base, and the code base will be much, much smaller for the same functionality.