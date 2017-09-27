'use strict';
const config = require("../config");
const exec = require('child_process').exec;

exports.executeOsOperation = (req, res) => {
	if (!config.os_operations[req.swagger.params.operation.value])
		res.status(400).send("invalid setting id");
	else
		exec(config.os_operations[req.swagger.params.operation.value])
		res.status(200).json("operation executed");
}
