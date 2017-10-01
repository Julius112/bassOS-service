'use strict';
const config = require("../config");
const service_manager = require("../utils/service_manager");

exports.getServiceStatus = (req, res) => {
	for (var i = 0; i < config.services.length; i++)
		if (config.services[i].name === req.swagger.params.service_name.value) {
			res.status(200).json({"status": config.services[i].state});
			return;
		}
	res.status(400).send("invalid service name");
}

exports.setServiceStatus = (req, res) => {
	for (var i = 0; i < config.services.length; i++)
		if (config.services[i].name === req.swagger.params.service_name.value) {
			service_manager.source_change(i, req.swagger.params.service_playback.value.playback);
			res.status(200).send("ok");
			return;
		}
	res.status(400).send("invalid service name");
}
