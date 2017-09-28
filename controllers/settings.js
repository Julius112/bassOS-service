'use strict';
const config = require("../config");
const sse = require("../utils/sse");
const service_manager = require("../utils/service_manager");

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
		/* if autosource setting changed then services need to be disabled/enabled */
		if (config.settings[req.swagger.params.setting_id.value].name === "autosource")
			service_manager.source_change(-1);
		else if (	config.settings[req.swagger.params.setting_id.value].name === "airplay" ||
					config.settings[req.swagger.params.setting_id.value].name === "bluetooth" ||
					config.settings[req.swagger.params.setting_id.value].name === "mpd" ) {
			for (var i = 0; i < config.services.length; i++)
				if (config.services[i].name === config.settings[req.swagger.params.setting_id.value].name) {
					service_manager.service_change(i, req.swagger.params.setting_status.value.status);
					break;
				}
		}
		/*
		else if ( config.settings[req.swagger.params.setting_id.value].name === "bluetooth_pairable" ) {
		}
		*/
		res.status(200).send("successful operation");
		/* TODO redesign the SSE events */
		see_event_data[config.settings[req.swagger.params.setting_id.value].name] = {state: req.swagger.params.setting_status.value.status};
		sse.sendUpdate({event_id : config.sse_events.settingChange, event_data: sse_event_data});
	}
}
