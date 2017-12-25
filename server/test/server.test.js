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
	text : 'Second test todo',
	completed : true,
	completedAt : 333
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

describe('DELETE /todos/:id',() => {
	it('should remove a todo',(done) => {
		var hexId = todo[1]._id.toHexString() ;
		
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				//console.log(res.body);
				expect(res.body.todo._id).toBe(hexId);
			})	
			.end((err,res) => {
				if(err){
					return done(err);
				} 

				Todo.findById(hexId).then((res) => { 
					expect(res).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});

	it('should return 404 if todo not found',(done) => {
		var id = new ObjectID();
		//console.log(id);
		request(app)
			.delete(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if object id is invalid',(done) => {
		request(app)
			.get('/todos/12345')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id',()=>{
	it('should update the todo',(done) => {
		var data = {
			text : "Updating Patch through Testing",
			completed : true
		};  
		request(app)
			.patch(`/todos/${todo[0]._id.toHexString()}`)
			.send(data)
			.expect(200)
			.expect((res) => {
				//console.log(res.body)
				expect(res.body.todo.text).toBe(data.text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number')
			})
			.end(done);
	});

	it('should clear completedAt when todo is not completed',(done) => {
		var data = {
			text : "Updating Completed to False Through Test Script",
			completed : false
		};
		request(app)
			.patch(`/todos/${todo[1]._id.toHexString()}`)
			.send(data)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(data.text)
				expect(res.body.todo.completed).toBe(false)
				expect(res.body.todo.completedAt).toNotExist(null)
			})
			.end(done); 
	});
});

