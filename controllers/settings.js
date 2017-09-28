'use strict';
const config = require("../config");

exports.getAllSettings = (req, res) => {
	res.setHeader('content-type', 'application/json');
	var result = [];
	for(var i=0; i < config.settings.length; i++)
		result.push({id: i, name: config.settings[i].name, status: config.settings[i].status})
	res.json(result);
}

exports.getSettingStatus = (req, res) => {
	if (!config.settings[req.swagger.params.setting_id.value])
		res.status(400).send("invalid setting id");
	else
		res.status(200).json(config.settings[req.swagger.params.setting_id.value]);
}

exports.setSettingStatus = (req, res) => {
	if (!config.settings[req.swagger.params.setting_id.value])
		res.status(400).send("invalid setting id");
	else {
		config.settings[req.swagger.params.setting_id.value].status = req.swagger.params.setting_status.value.status;
		/*TODO execute setting operation */
		res.status(200).send("successful operation");
	}
}
