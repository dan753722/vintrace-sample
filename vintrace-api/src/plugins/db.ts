const mongoose = require('mongoose');

import feedData from './dataFeeder';

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const database = process.env.MONGO_DATABASE || 'fastify';

mongoose.connect(`mongodb://${host}:${port}/${database}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	if (!err) {
		console.log('MongoDB connection successful.');
		feedData().then(() => console.log('Data fed to db'));
	}
	else
		console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;