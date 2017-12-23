const mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
	text: {
		type : String,
		required: true,
		minlength:1,
		trim:true
	},
	completed: {
		type : Boolean,
		default: false
	},
	completedAt: {
		type : Number,
		default: null
	}
});

/*var newTodo = new Todo({
	text:'Cook dinner',
	completed:true,
	completedAt:28
});

newTodo.save().then((doc) => {
	console.log('save todo',doc)
},(e) => {
	console.log('Unable to save todo',e);
});*/

module.exports = {Todo} ;