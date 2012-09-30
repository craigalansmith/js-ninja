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
	
	// first define a function which will serve as a wrapper round the variables defined within - an object
	function Cake() {
		var slices = 0;

		this.getSlices = function() {
			return slices;
		};

		this.slice = function() {
			slices++;
		};
	}
	
	// use the new keyword with the wrapper function / object
	var cake = new Cake();
	cake.slice();

	assert(cake.getSlices() == 1, "we are able to access the internal slice data.");

	assert(cake.slices == undefined, "and the private data is inaccessible to us.");
	
	// 4.1.2 - callbacks and timers
	
	var elem = $("div");
	elem.html("loading...");

	$.ajax({
		url: "main.html",
		success: function(html) {
			assert(elem, "the element to append to, via a closure.");
			elem.html(html); // save doing another DOM query by using the closure to access the element.
		}
	});
	
	// using a closure from a timer interval
	var elem = document.getElementById("box");
	var count = 0;

	var timer = setInterval(function() {
		if (count < 100) {
			elem.style.left = count + "px";
			count++;
		} else {
			assert(count == 100, "count came via a closure, accessed each step.");
			
			assert(timer, "the timer reference is also via a closure");

			clearInterval(timer);
		}
	}, 10);	

});

