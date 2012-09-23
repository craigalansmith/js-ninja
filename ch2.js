// ch2 - testing and debugging

/*
Particularly important where external factors can affect our code ie browser differences.

*/

// 2 approaches to debugging js: logging and breakpoints

// can log to the console using console.log() - much better than alerts

// cross-browser console.log
function log() {
    try {
        // the most common method

        // note here we use the apply method of the js Function
        // to relay the arguments passed to this function
        // to console.log
		console.log.apply(console, arguments);
	}
	catch(e) {
		try {
            // try the opera way
			opera.postError.apply(opera, arguments);
		}
		catch(e) {
            // if all else fails then alert

            // here we use the call method of the js Function
			alert(Array.prototype.join.call(arguments, " "));
		}
	}
}

// Test generation

// Good tests are:
//    - repeatable
//    - simple
//    - independent

// deconstructive vs constructive (??)

// assert
function assert(value, desc) {
	var li = document.createElement("li");
	li.className = value ? "pass" : "fail";
	li.appendChild(document.createTextNode(desc));
	document.getElementById("results").appendChild(li);
}
