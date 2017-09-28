'use strict';
const config = require("../config");
const sse = require("../utils/sse");

exports.subscribe = (req, res) => {
	res.setHeader('content-type', 'application/json');
	// set connection to never end
	req.socket.setTimeout(Infinity);
	// send header for SSE connection
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	res.write('\n');

	// Register subscriber
	sse.addSubscriber(res);
	
	// If connection is closed remove subscriber
	req.on("close", () => {
		sse.removeSubscriber(res);
	});
}
