var express = require('express');
var bodyParser = require('body-parser') ;

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {Users} = require('./models/user.js');

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

app.listen(3000,() => {
	console.log('Started on port 3000') ;
});

module.exports = {app}
