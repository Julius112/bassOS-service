'use strict';
const config = require("../config");

exports.getAllSwitches = (req, res) => {
	res.setHeader('content-type', 'application/json');
	var result = [];
	for(var i=0; i < config.switches.length; i++)
		result.push({id: i, name: config.switches[i].name, status: config.switches[i].status})
	res.json(result);
}

exports.getSwitchStatus = (req, res) => {
	if (!config.switches[req.swagger.params.switch_id.value])
		res.status(400).send("invalid setting id");
	else
		res.status(200).json(config.switches[req.swagger.params.switch_id.value]);
}

exports.setSwitchStatus = (req, res) => {
	if (!config.switches[req.swagger.params.switch_id.value])
		res.status(400).send("invalid setting id");
	else {
		config.switches[req.swagger.params.switch_id.value].status = req.swagger.params.switch_status.value.status;
		/*TODO execute switch operation */
		res.status(200).send("successful operation");
	}
}
