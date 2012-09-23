// chapter 3 - Functions are fundamental
//
// most of this done elsewhere so to recap:
//
// 1. functions are first-class objects - they can be treated as any other object - passed, assigned declared literally etc.
//
// 2. anonymous functions are used extensively in javascript. (make code more compact, easier to read, put function declaration and use closer together, avoid introducing redundant names.)
//
// 3. there are three ways to declare them:

function isAnimal() { return true; }			// named function

var isVegetable = function() { return true; } 	// declared as a variable

window.isMineral = function() { return true; }	// declared as a property

log(window.isAnimal());
log(window.isVegetable());
log(window.isMineral());

// 4. only named functions can be forward-referenced.
//
// 5. functions are objects. anonymous functions don't have names (for named functions, the name is stored in the name property of the function object.)
//
// 6. functions have context - "this". so for example, if we had an anonymous, recursive function, the recursive call would be made via "this".
//
// 
