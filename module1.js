function myFunction() {
	console.log('function was called');
}

let name = 'Max';

// binding it to the module object using export keyword
// the function doesn't have parenthesis so that it doesn't execute right away
module.exports.myFunction = myFunction;
module.exports.myString = name;