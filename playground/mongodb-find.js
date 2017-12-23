const {MongoClient,ObjectID} = require('mongodb') ;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}	
	console.log('Connected to MongoDB Server');

	/*db.collection('Todos').insertOne({
		text:'Something to do',
		completed:false
	},(err,result) => {
		if(err){
			return console.log('Unable to insert document to Todos',err);
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});*/

	/*db.collection('Users').insertOne({
		name:'Vineet Harkut',
		age:27,
		location:'M G Road Bangalore'
	},(err,result) => {
		if(err){
			return console.log('Unable to insert document to Todos',err);
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});*/
	
	/*db.collection('Todos').find({completed:false}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	},(err) => {
		console.log('Unable to fetch todos',err);
	});*/

	/*db.collection('Todos').find({
		_id : new ObjectID('5a3a9acac3b194d9ddfada07')
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	},(err) => {
		console.log('Unable to fetch todos',err);
	});*/

	db.collection('Users').find({name: "Vineet Harkut"}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	},(err) => {
		console.log('Unable to fetch todos',err);
	});

	//db.close();
});