// chapter 3 - Functions are fundamental

$(document).ready(function() {
//
// most of this done elsewhere so to recap:
//
// 1. functions are first-class objects - they can be treated as any other object - passed, assigned declared literally etc.
//
// (3.2 - Anonymous functions)
//
// 2. anonymous functions are used extensively in javascript. (make code more compact, easier to read, put function declaration and use closer together, avoid introducing redundant names.)
//
// 3. there are three ways to declare them:

function isAnimal() { 
	// where are we anyway?
	log(this);
	return true; }			// named function

var isVegetable = function() { 
	// where are we anyway?
	log(this);
	return true; } 	// declared as a variable

window.isMineral = function() { 
	// where are we anyway?
	log(this);
	return true; }	// declared as a property

log(isAnimal());
log(isVegetable());
log(isMineral());
log(this);

// 4. only named functions can be forward-referenced.
//
// 5. functions are objects. anonymous functions don't have names (for named functions, the name is stored in the name property of the function object.)
//
// 6. functions have context - "this".
//
// 7. when we use this in a method, it points to the object through which the method was invoked.
//
// 8. confusingly, anonymous functions can be given a name. with these "inline functions" however, the name is only visible within the function itself.
// 		- so this is a second way of referencing "this" function.
//
// 9. and a third way - arguments.callee. the arguments ref is available within every function and points to the arg list. the callee property is a ref to the function.
//
// (3.3 Functions as Objects)
//
// 10. functions are objects - eg. they have properties and we can add new properties to them. one application of this would be in callback management. if functions can be
// 			added to a list of functions to be called back, then we don't want to allow duplicates. This could be achieved by assigning to a newly created property on the
// 			function when it is added, then check the value of this before adding to the collection:

// a collection of unique functions
var store = {
	nextId: 1,
	cache: {},
	add: function(fn) {
		if (!fn.id) {
			fn.id = store.nextId++;
			return !!(store.cache[fn.id] = fn);	
			// (no need for this - just to demonstrate the !! operator...
			//	 converts any expression to it's boolean equivalent - in this case, the value of a function which will always be true
		}
	}
};

function ninja() { }

assert(store.add(ninja), "function added to store successfully");
assert(store.add(ninja), "shouldn't be possible to add a second time");

// 11. self-memoizing functions - functions that retain information about previous invocations
//
// again, functions are just objects and we can declare and assign to properties of them. in this case, to cache computed answers

function isPrime(value) {
	// if there is no answers property then declare one
	if (!isPrime.answers) isPrime.answers = {};
	
	// if we have the answer cached then return it
	if (isPrime.answers[value] != null) {
		return isPrime.answers[value];
	}

	var prime = value != 1 // 1 can never be prime
	for (var i = 2; i < value; i++) {
		if (value % i == 0) {
			prime = false;
			break;
		}
	}
	return isPrime.answers[value] = prime;
}

assert(isPrime(5), "5 is prime");
assert(isPrime.answers[5], "the answer was cached");

// in this case, memoizing gives improved performance - esp for computationally intensive larger values
// also, it all happens without the caller having to do anything

// another example which caches the results of DOM queries

function getElements(name) {
	if (!getElements.cache) getElements.cache = {};

	if (!getElements.cache[name]) {
		getElements.cache[name] = document.getElementsByTagName(name);
	}
	return getElements.cache[name]; 
}

assert(getElements("ul").length > 0, "there is at least one unordered list tag on the page");
assert(getElements.cache["ul"], "the list of DOM elements was cached.");

// 3.4 Context - every function has a context accessed through the "this" reference which points to the object within which the function is being executed

// if the function is being invoked as a method of an object, then the context is the method's object
//
// what about functions defined on the top level?

function katana() {
	this.isSharp = true;
}

katana();

assert(isSharp === true, "a global property now exists"); // important to be aware of what a function's context is

// one more time - the context of a function is determined by how it is invoked

// call() and apply() allow us to define the context (as well as the arguments) when we call functions:

var getContext = function() { 
	return this; 
}

someObject = {};

assert(getContext() == window, "the context is the global object");
assert(getContext.call(someObject) == someObject, "call() was used to change the context to a specific object");

// call and apply similar, but call accepts arguments individually, while apply takes an array of arguments

function add(a, b) {
	return a + b;
}

assert(add.call(this, 1, 2) == 3, "call() takes args individually");
assert(add.apply(this, [1, 2]) == 3, "apply() takes an array of args");

// a use for call() / apply() - callbacks

// call the given function passing in each array element. stop if the function returns false.
function each(array, fn) {
	for (var i = 0; i < array.length; i++)
		if (fn.call(array, array[i], i) === false)
			break;
}

var num = 0;
var numbers = [4, 5, 6];

each(numbers, function(value, n) {
	assert(this === numbers, "Context is correct");
	assert(n == num++, "Counter as expected");
	assert(value = numbers[n], "Value as expected");
});

// another example of the uses of configuring the function context using call()
//
// a collection of DOM elements, reusing functionality from the javascript Array object

var elements = {
	length: 0,
	add: function(element) {
		Array.prototype.push.call(this, element);
	},
	find: function(id) {
		this.add(document.getElementById(id));
	}
};

elements.find("results");
assert(elements.length == 1 && elements[0].nodeType, "verify that we have an element in our collection");

elements.find("results");
assert(elements.length == 2 && elements[1].nodeType, "verify the second insertion");

// 3.5 - Variable-length argument lists

// functions can accept an arbitrary number of arguments

// finding the largest number in an array of ints

// instead of looping through, we can use Math.max

function smallest(array) {
	return Math.min.apply(Math, array);
}

function largest(array) {
	return Math.max.apply(Math, array);
}

// remember that apply() allows us to pass an array of args to a function

assert(smallest([0, 1, 2, 3]) == 0, "found the smallest value");

assert(largest([0, 1, 2, 3]) == 3, "found the largest value");

// method overloading in javascript - unlike many other languages, we don't define separate versions of the function - instead we examine the arguments property.

// merge the contents of multiple objects into a single root object
// the root object is the first argument - subsequent arguments are merged into the root
function merge(root) {
	for (var i = 1; i < arguments.length; i++) {
		
		// for-in loop - iterates through all properties of an object setting the property name as the iteration item
		for (var key in arguments[i]) {
			root[key] = arguments[i][key];
		}
	}
	return root;
}

// in javascript we can pass an arbitrary number of arguments to a function - nothing to do with the number of formal parameters in the function declaration

var merged = merge(
		{name: "Denmark"},
		{city: "Copenhagen"});

assert(merged.name == "Denmark", "the name is intact");
assert(merged.city == "Copenhagen", "the city is intact");

// multiply the first argument by the largest remaining argument
function firstByLargestRemaining(first) {
	// arguments is not a true array - fool the Array.prototype.slice to operate on it using call:
	var args = Array.prototype.slice.call(arguments, 1);

	return first * Math.max.apply(Math, args);
}

assert(firstByLargestRemaining(3, 1, 2, 3) == 9, "3*3=9 (first by largest)");

// function overloading by simply inspecting the arguments property and branching can become unwieldy - there is another way:
//
// all functions have a length property which gives the number of formal parameters
//
// we create a function that binds anonymous functions to a common name:

function addMethod(object, name, fn) {

	// get a ref to the existing "name" property on "object"
	var old = object[name];

	// assign a new function to object.name, which will compare the number of arguments actually passed with the number of formal arguments of the new function fn.
	// if the number of args matches the number fn expects, then fn is apply()ed...
	// otherwise the old object.name is applied, providing it is actually a function.
	//
	// of course, old itelf could also be a function of this type, comparing the number of passed in args with the number of formal parameters.
	object[name] = function() {
		if (fn.length == arguments.length) {
			return fn.apply(this, arguments);
		}
		else if (typeof old == 'function') {
			return old.apply(this, arguments);
		}
	};
}

var people = {
	values: ["Charles Bronson", "Chuck Norris", "Steven Seagal"]
};

addMethod(people, "find", function() {
	return this.values;
});

addMethod(people, "find", function(name) {
	var ret = [];
	for (var i = 0; i < this.values.length; i++)
		if (this.values[i].indexOf(name) == 0)
			ret.push(this.values[i]);
	return ret;
});

addMethod(people, "find", function(first, last) {
	var ret = [];
	for (var i = 0; i < this.values.length; i++)
		if (this.values[i] == (first + " " + last))
			ret.push(this.values[i]);
	return ret;
});

assert(people.find().length == 3, "found everyone");

assert(people.find("Chuck").length == 1, "found someone by first name");

assert(people.find("Charles Bronson").length == 1, "found someone by first and last name");

assert(people.find("Sam", "B", "Nobody") == null, "found nothing");


// note that the different overloads are stored in closures - more in ch4. also, this technique is limited to overloading based on numbers of arguments - not type.

// 3.6 check to see if an object is a function.


function doIt() {}

assert(typeof doIt == "function", "functions have a type of function");

// however, this will not work in all situations cross-browser


		





// end document ready
});
