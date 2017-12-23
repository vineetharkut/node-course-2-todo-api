const mongoose = require('mongoose');

var Users = mongoose.model('Users',{
	email: {
		type : String,
		required: true,
		minlength:1,
		trim:true
	}
});

/*var newUsers = new Users({
	email:'vineetharkut@gmail.com',
});

newUsers.save().then((doc) => {
	console.log('Save Users',doc);
},(e) => {
	console.log('Unable to save todo',e);
});*/

module.exports = {Users} ;