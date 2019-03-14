const debug = require('debug')('mongo');
const mongoose = require('mongoose');
const path = require('path');
const FileLoader = require('../core/lib/loader/fileLoader');
const MODELS = Symbol('mongoModules');

module.exports = (app, opt) => {
	const mongo = {};
	mongo[MODELS] = new Map();
	const config = app.config.mongo;
	createConnect(config);
	const schemas = parseSchema(opt);
	createModel(mongo, schemas);
	return mongo;
};

function createModel(mongo, schemas) {
	let modelMap = mongo[MODELS];

	for (let item of schemas) {
		let model = item.properties[0];
		let schema = item.exports;

		let modelInstance = mongoose.model(model, schema);
		debug('model %s', model);
		modelMap.set(model, modelInstance);

		Object.defineProperty(mongo, model, {
			get() {
				return modelMap.get(model);
			}
		});
	}
}

function parseSchema(opt) {
	return new FileLoader({
		target: {},
		directory: path.join(opt.baseDir, 'app/schema')
	}).parse();
}

function createConnect(config) {
	mongoose.connect(config.url, {
		useNewUrlParser: true, //mongodb://localhost:27017/dbname
		auth: {
			user: config.user,
			password: config.pass
		},
		connectTimeoutMS: 3000, // Give up initial connection after 10 seconds
		socketTimeoutMS: 3000, // Close sockets after 45 seconds of inactivity
		family: 4 // Use IPv4, skip trying IPv6
	});
	mongoose.set('debug', config.debug);
}
