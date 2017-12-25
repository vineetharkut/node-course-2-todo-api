require('./config/config.js');

const express 		= require('express');
const bodyParser 	= require('body-parser');
const {ObjectID} 	= require('mongodb');
const _ = require('lodash');
const {mongoose} = require('./db/mongoose.js');
const {Todo} 	 = require('./models/todo.js');
const {Users} 	 = require('./models/user.js');

var app = express();
var port = process.env.PORT ;

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

app.delete('/todos/:id',(req,res) => {
	var id = req.params.id ;
	if(!ObjectID.isValid(id)){
		return res.status(404).send('Id is not valid');
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			return res.status(404).send('Records already removed');
		}
		res.status(200).send({todo}) ;
	},(err) => {
		res.status(404).send('Some error occur');
	});
});

app.patch('/todos/:id',(req,res) => {
	var id 		= req.params.id ;
	var body 	= _.pick(req.body,['text','completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send('Id is not valid');
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed   = false ;
		body.completedAt = null ;
	}

	Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo) => {
		if(!todo){
			res.send(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port,() => {
	console.log(`Started on port ${port}`) ;
});

module.exports = {app}
