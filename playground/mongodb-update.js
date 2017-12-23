const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		console.log('Unable to connect to Database ',err);
	}
	console.log('Connected to MongoDB Server');

	/*db.collection('User').findOneAndUpdate({
		_id: new ObjectID('5a3a9da8c3b194d9ddfadb2a')
	},{
		$set: {
			completed: true	
		}
	},{
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});*/

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5a3a9da8c3b194d9ddfadb2a')
	},{
		$set: {
			name: "Manmeet Harkut"	
		},
		$inc: { age: 2 }
	},{
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

});