const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}	 = require('./../server/models/todo');
const {User}	 = require('./../server/models/user');

Todo.remove({}).then(() => {
	console.log(result);
});

Todo.findOneAndRemove({_id: '5a3f7259ca580e0f0ae9c458'}).then((docs) => {
	console.log(docs);
});

Todo.findByIdAndRemove('5a3f7259ca580e0f0ae9c458').then((docs) => {
	console.log(docs);
});