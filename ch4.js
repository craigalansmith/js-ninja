// chapter 4: Closures
//
//
//

// closures - usually only found in functional languages.

// can simplify complex operations, improve performance and solve scoping problems.

// a closure is a way to access external variables from within a function - a function has access to all the variables and functions declared in the same scope as itself.

$(document).ready(function() {

	var outerValue = true;
	
	function outerFn(arg1) {
		var innerValue = true;

		assert(outerFn && outerValue, "these come from the closure");

		assert(typeof otherValue === "undefined", "variables defined late are not in the closure");

		function innerFn(arg2) {
			assert(outerFn && outerValue, "these still come from the closure");

			assert(innerFn && innerValue && arg1, "all from a closure as well");
		}

		innerFn(true);
	}
	
	outerFn(true);

	var otherValue  = true;

	assert(outerFn && outerValue, "globally accessible variables and functions");

	// 4.1.1 - first use for closures - creating private variables
	
	// (page 65)

});

