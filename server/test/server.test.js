const expect 	= require('expect');
const request 	= require('supertest');
const {ObjectID}= require('mongodb');

const {app} 	= require('./../server');
const {Todo}	= require('./../models/todo');

const todo = [{
	_id : new ObjectID(),
	text : 'First test todo'
},{
	_id : new ObjectID(),
	text : 'Second test todo'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		//done() ;
		return Todo.insertMany(todo);
	}).then(() => done());
});

describe('POST /todos',() => {
	it('Should create a new todo',(done) => {
		var text = "A New Text" ;

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((result) => {
				expect(result.body.text).toBe(text);
			})
			.end((err,res) => {
				if(err){
					return done(err) ;
				}

				Todo.find({text}).then((result) => {
					expect(result.length).toBe(1)
					expect(result[0].text).toBe(text);
					done();	
				}).catch((e) => done(e));
			});
	});

	it('Should not create todo with invalid body data',(done) => {
		var text = "" ;

		request(app)
			.post("/todos")
			.send({text})
			.expect(400)
			
			.end((err,res) => {
				if(err){
					return done(err);
				}	

				Todo.find().then((result) => {
					expect(result.length).toBe(2)
					done();	
				}).catch((e) => done(e));
			});
	});
});

describe('GET /todos',() => {
	it('Should get all todos',(done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((result) => {
				//console.log(result.body);
				expect(result.body.todos.length).toBe(2);
				done();
			})
			.end(done());
	});
});

describe('GET /todos/:id',() => {
	it('Should return todo doc',(done) => {
		//console.log(`${todo[0]._id.toHexString()}`);
		request(app)
			.get(`/todos/${todo[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				//console.log(res.body.todo.text); 
				expect(res.body.todo.text).toBe(todo[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found',(done) => {
		var id = new ObjectID();
		//console.log(id);
		request(app)
			.get(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non object ids',(done) => {
		request(app)
			.get('/todos/12345')
			.expect(404)
			.end(done);
	});
});

