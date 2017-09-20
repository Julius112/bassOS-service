'use strict';
const config = require("../config");
const joinUrl = require("url-join");

//TODO move in config
var settings = [{"bluetooth" : true}, {"bluetooth_pairable" : false}, {"mpd" : "true"}, {"airplay" : true}, {"auto_source" : "true"}];

exports.getAllSettings = (req, res) => {
	res.setHeader('content-type', 'application/json');
	res.json(settings);
}

exports.getSettingStatus = (req, res) => {
	if (!settings[req.swagger.params.setting-id.value])
		res.status(400).send("invalid setting id");
	else
		res.status(200).json(settings);
}

exports.setSettingStatus = (req, res) => {
	if (!settings[req.swagger.params.setting-id.value])
		res.status(400).send("invalid setting id");
	else {
		settings[req.swagger.params.setting-id.value] = req.swagger.params.setting-status.value.status;
		res.status(200).send("successful operation");
	}
}
