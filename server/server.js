var express 	= require('express');
var bodyParser 	= require('body-parser');
var {ObjectID} 	= require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} 	 = require('./models/todo.js');
const {Users} 	 = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
	console.log(req.body.text);
	var todo = new Todo({
		text:req.body.text
	});

	todo.save().then((result) => {
		res.send(result);
	},(err) => {
		res.status(400).send(err)
	});
});

app.get('/todos',(req,res) => {
	Todo.find().then((result) => {
		res.send({result});
	},(err) => {
		res.status(400).send(err);
	});
});

// Get Params Logic
app.get('/todos/:todoId',(req,res) => {
	var id = req.params.todoId ;
	if(!ObjectID.isValid(id)){
		return res.status(404).send('Id is not valid') ;
	}
	Todo.findById(id).then((todo) => {
		if(!todo){
			return res.status(404).send('User not found');
		}
		res.send({todo});
	});
});

app.listen(3000,() => {
	console.log('Started on port 3000') ;
});

module.exports = {app}
