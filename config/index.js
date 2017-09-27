'use strict';


const path = require('path');
const url = require("url");

module.exports = {
	server: {
		port: 3000
	},
	settings: [
		{"bluetooth" : true},
		{"bluetooth_pairable" : false},
		{"mpd" : true},
		{"airplay" : true},
		{"auto_source" : true}
	],
	/* TODO insert full path to binaries for operations */
	os_operations: {
		shutdown: "sudo halt",
		reboot: "sudo reboot",
	},
	swagger: {
		spec: path.join(__dirname, '..', 'api', 'swagger.yaml'),
		router: {
			swaggerUi: '/swagger.json',
			controllers: path.join(__dirname, '..', './controllers'),
		}
	}
};
