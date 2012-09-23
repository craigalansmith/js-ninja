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

var store = {
	nextId: 1,
	cache: {},
	add: function(fn) {
		if (!fn.id) {
			fn.id = store.nextId++;
			return !!(store.cache[fn.id] = fn);	
			// the !! operator converts any expression to it's boolean equivalent - in this case, the value of a function which will always be true
		}
	}
};



// end document ready
});
