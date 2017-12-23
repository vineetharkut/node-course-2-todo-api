const {MongoClient,ObjectID} = require('mongodb') ;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}	
	console.log('Connected to MongoDB Server');

	// delete Many
	/*db.collection('Todos').deleteMany({hobby: "Cricket"}).then((result) => {
		console.log('Todos');
		//console.log(JSON.stringify(result,undefined,2));
		console.log(result);
	},(err) => {
		console.log('Unable to fetch todos',err);
	});*/

	//delete One
	/*db.collection('Todos').deleteOne({hobby: "Baseball"}).then((result) => {
		console.log('Todos');
		//console.log(JSON.stringify(result,undefined,2));
		console.log(result);
	},(err) => {
		console.log('Unable to fetch todos',err);
	});*/

	// Find one and delete
	/*db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log('Todos');
		//console.log(JSON.stringify(result,undefined,2));
		console.log(result);
	},(err) => {
		console.log('Unable to fetch todos',err);
	});*/

	// delete Many
	/*db.collection('Todos').deleteMany({name: "Vineet Harkut"}).then((result) => {
		console.log('Todos');
		console.log(result);
	},(err) => {
		console.log('Unable to fetch todos',err);
	});*/

	//delete One
	db.collection('Todos').deleteOne({
		_id: new ObjectID("5a3b2ac3c3b194d9ddfae119")
	}).then((result) => {
		console.log('Todos');
		console.log(result);
	},(err) => {
		console.log('Unable to fetch todos',err);
	});


	//db.close();
});