'use strict';
const config = require("../config");

var id = 1;

var subscriber = [];

exports.addSubscriber = (res) => {
	subscriber.push(res);
}

exports.removeSubscriber = (res) => {
	for (var j =0 ; j < subscriber.length ; j++) {
		if (subscriber[j] == res) {
			subscriber.splice(j,1);
			break;
		}
	}
}

exports.sendUpdate = (data) => {
	id = (id % (Number.MAX_VALUE - 1)) + 1;
	subscriber.forEach((connection) => {
		connection.write('id: ' + id + '\n');
		connection.write('data:' + JSON.stringify(data) + '\n\n');
	});
}
