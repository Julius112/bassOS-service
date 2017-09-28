'use strict';


const path = require('path');
const url = require("url");

module.exports = {
	server: {
		port: 3000
	},
	switches: [
		{name: "switch1", status: false, pin: 10},
		{name: "switch2", status: true, pin: 11}
	],
	settings: [
		{name: "bluetooth", status : true},
		//{name: "bluetooth_pairable", status : false},
		{name: "mpd", status : true},
		{name: "airplay", status : true},
		{name: "auto_source", status : true}
			],
	services: [
		{
			name: "bluetooth",
			state: "stopped",
			operations: {
				start: "sudo /bin/systemctl start bt_speaker",
				stop: "sudo /bin/systemctl stop bt_speaker",
				playback_stop: "sudo /bin/systemctl restart bt_speaker"
			}
		},
		{
			name: "airplay",
			state: "stopped",
			operations: {
				start: "sudo /bin/systemctl start shairport-sync",
				stop: "sudo /bin/systemctl stop shairport-sync",
				playback_stop: "sudo /bin/systemctl restart shairport-sync"
			}
		},
		{
			name: "mpd",
			state: "stopped",
			operations: {
				start: "sudo /bin/systemctl start mpd.socket && sudo /bin/systemctl start mpd && sudo /bin/systemctl start mpd-watchdog",
				stop: "sudo /bin/systemctl stop mpd-watchdog && sudo /bin/systemctl stop mpd.socket && sudo /bin/systemctl stop mpd",
				playback_stop: "mpc pause"
			}
		}
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
