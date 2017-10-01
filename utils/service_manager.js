'use strict';
const config = require("../config");
const exec = require('child_process').exec;

exports.source_change = (id, playback) => {
	console.log("source_change: "+id);
	if (id < 0) {
		for (var j = 0; j < config.settings.length; j++)
			if (config.settings[j].name === "auto_source") {
				/* if autosource is set */
				if (config.settings[j].status) {
					for (var i = 0; i < config.services.length; i++)
						for(var k = 0; k < config.settings.length; k++)
							if (config.services[i].name === config.settings[k].name) {
								if (config.settings[k].status)
									if (config.services[i].state === "stopped") {
										config.services[i].state = "active";
										exec(config.services[i].operations.start);
									}
								break;
							}
				}
				/* if autosource is not set */
				else {
					var service_playing = 0;
					for (var i = 0; i < config.services.length; i++) {
						if (config.services[i].state === "playing")
							service_playing++;
					}
					if (service_playing > 0) {
						for (var i = 0; i < config.services.length; i++)
							if (config.services[i].state === "active") {
								config.services[i].state = "stopped";
								exec(config.services[i].operations.stop);
							}
					}
					else {
						for (var i = 0; i < config.services.length; i++)
							for (var k = 0; k < config.settings.length; k++)
								if (config.services[i].name === config.settings[k].name) {
									if (config.settings[k].status) {
										config.services[i].state = "active";
										exec(config.services[i].operations.start);
									}
									else {
										config.services[i].state = "stopped";
										exec(config.services[i].operations.stop);
									}
								}
					}
				}
				break;
		}
	}
	else {
		if (!playback) {
			for (var j = 0; j < config.settings.length; j++) {
				if (config.settings[j].name === "auto_source") {
					/* if autosource is not set */
					if (!config.settings[j].status) {
						for (var i = 0; i < config.services.length; i++) {
							if (i === id)
								continue;
							for (var k = 0; k < config.settings.length; k++)
								if (config.services[i].name === config.settings[k].name) {
									if (config.settings[k].status) {
										config.services[i].state = "active";
										exec(config.services[i].operations.start);
									}
									break;
								}
						}
					}
					break;
				}
			}
			config.services[id].state = "active";
		}
		else {
			for (var j = 0; j < config.settings.length; j++) {
				if (config.settings[j].name === "auto_source") {
					/* if autosource is set */
					if (config.settings[j].status) {
						for (var i = 0; i < config.services.length; i++) {
							if (config.services[i].state === "playing") {
								//The mpd-watchdog will notify about beeing paused
								if (!(config.services[i].name === "mpd"))
									config.services[i].state = "active";
								exec(config.services[i].operations.playback_stop);
							}
						}
					}
					/* if not autosource */
					else {
						for (var i = 0; i < config.services.length; i++) {
							if (i === id)
								continue;
							config.services[i].state = "stopped";
							exec(config.services[i].operations.stop);
						}
					}
					config.services[id].state = "playing";
					break;
				}
			}
		}
	}
	debug_print_services();
}

exports.service_change = (id, state) => {
	if( state )
		for (var i = 0; i < config.settings.length; i++)
			if (config.settings[i].name === "auto_source") {
				if (config.settings[i].status) {
					config.services[id].state = "active";
					exec(config.services[id].operations.start);
				}
				else {
					var service_playing = 0;
					for (var i = 0; i < config.services.length; i++)
						if (config.services[i].state === "playing")
							service_playing++;
					if(service_playing === 0) {
						config.services[id].state = "active";
						exec(config.services[id].operations.start);
					}
				}
				break;
			}
	else {
		if (config.services[id].state === "playing")
			exports.source_change(id, false);
		config.services[id].state = "stopped";
		exec(config.services[id].operations.stop);
	}
}

/* only for debugging */
var debug_print_services = () => {
	console.log("-----------------");
	for (var i = 0; i < config.services.length; i++) {
		console.log(config.services[i].name+": "+config.services[i].state);
	}
	console.log("-----------------");
}
