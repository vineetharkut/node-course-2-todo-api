const expect 	= require('expect');
const request 	= require('supertest');

const {app} 	= require('./../server');
const {Todo}	= require('./../models/todo');


beforeEach((done) => {
	Todo.remove({}).then(() => {
		done() ;
	});
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

				Todo.find().then((result) => {
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
					expect(result.length).toBe(0)
					done();	
				}).catch((e) => done(e));
			});
	});
});