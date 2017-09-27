'use strict';
const config = require("../config");
const joinUrl = require("url-join");

exports.getAllSettings = (req, res) => {
	res.setHeader('content-type', 'application/json');
	res.json(config.settings);
}

exports.getSettingStatus = (req, res) => {
	if (!config.settings[req.swagger.params.setting-id.value])
		res.status(400).send("invalid setting id");
	else
		res.status(200).json(config.settings);
}

exports.setSettingStatus = (req, res) => {
	if (!config.settings[req.swagger.params.setting-id.value])
		res.status(400).send("invalid setting id");
	else {
		config.settings[req.swagger.params.setting-id.value] = req.swagger.params.setting-status.value.status;
		res.status(200).send("successful operation");
	}
}
