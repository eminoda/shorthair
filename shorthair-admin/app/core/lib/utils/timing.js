const MAP = Symbol('Timing#map');
const LIST = Symbol('Timing#list');
const debug = require('debug')('timing');
class Timing {
	constructor() {
		this[MAP] = new Map();
		this[LIST] = [];
	}
	start(name) {
		if (!name) return;

		if (this[MAP].has(name)) this.end(name);

		const start = Date.now();
		const item = {
			name,
			start,
			end: undefined,
			duration: undefined,
			pid: process.pid,
			index: this[LIST].length
		};
		this[MAP].set(name, item);
		this[LIST].push(item);
		return item;
	}
	end(name) {
		if (!name) return;
		const item = this[MAP].get(name);
		item.end = Date.now();
		item.duration = item.end - item.start;
		debug(`${item.name} cost ${item.duration}`);
		return item;
	}

	toJSON() {
		return this[LIST];
	}
}

module.exports = Timing;
