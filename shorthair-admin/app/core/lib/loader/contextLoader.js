const debug = require('debug')('contextLoader');
const FileLoader = require('./fileLoader');
const is = require('is-type-of');
const { CLASSLOADER, EXPORTS } = require('../utils/symbol');

class ContextLoader extends FileLoader {
	constructor(options = {}) {
		super(options);
		const target = (options.target = {}); // FileLoader.load set value
		const app = options.inject; // application
		const property = options.property; // service

		// lazy call
		// app.context.service execute
		Object.defineProperty(app.context, property, {
			get() {
				if (!this[CLASSLOADER]) {
					this[CLASSLOADER] = new Map();
				}
				const classLoader = this[CLASSLOADER];
				let instance = classLoader.get(property); // app.context.service
				// this ==> ctx
				if (!instance) {
					// target = { service1:{ fn1(){}fn2(){} } }
					instance = getInstance(target, this);
					classLoader.set(property, instance);
				}
				return instance;
			}
		});
	}
}
// new ClassLoader({ ctx, properties: target });
class ClassLoader {
	constructor(options) {
		const properties = options.properties;
		this._ctx = options.ctx;
		this._cache = new Map();
		// properties is options.target
		// app.context.service.user
		// debug('properties', properties);
		for (const property in properties) {
			this.defineProperty(property, properties[property]);
		}
	}
	defineProperty(property, values) {
		// this ClassLoader
		// ClassLoader.user
		Object.defineProperty(this, property, {
			get() {
				debug(values);
				let instance = this._cache.get(property);
				if (!instance) {
					instance = getInstance(values, this._ctx);
					this._cache.set(property, instance);
				}
				return instance;
			}
		});
	}
}
/**
 *
 * @param {*} values
 * @param {*} ctx app.context
 */
function getInstance(values, ctx) {
	const Class = values[EXPORTS] ? values : null;
	let instance;
	if (Class) {
		if (is.class(Class)) {
			instance = new Class(ctx);
		} else {
			instance = Class;
		}
	} else {
		instance = new ClassLoader({ ctx, properties: values });
	}
	return instance;
}
module.exports = ContextLoader;
