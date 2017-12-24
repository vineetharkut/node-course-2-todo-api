const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}	 = require('./../server/models/todo');
const {Users}	 = require('./../server/models/user');

// Todo Operation
/*
var id = '5a3f1fdfcc7f66abfdcfecc8' ;
if (!ObjectID.isValid(id)){
	console.log('ID not valid');
}

Todo.find({
	_id:id
}).then((todos) => {
	console.log('By Find Method ',todos);
});

Todo.findOne({
	_id : id
}).then((todos) => {
	console.log('By Find One Method ',todos);
});

Todo.findById(id).then((todo) => {
	if(!todo){
		console.log('Id not found');
	}
	console.log('By Find One Method ',todo);
}).catch((e) => { console.log(e)});
*/

// Users Operation
id = '5a3be98f1eb388a0a1dc2496' ;
Users.findById(id).then((user) => {
	if(!user){
		return console.log('User not found');
	}
	console.log('Fetching User By Find One Method ',user)
}).catch((e) => {
	console.log(e);
});
