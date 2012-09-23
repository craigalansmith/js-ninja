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

// (on page 51)









		





// end document ready
});
