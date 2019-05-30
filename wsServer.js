var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3001;
var clientCount = 0;
app.listen(PORT);

io.on('connection', function (socket) {
	clientCount++;
	socket.nickname = 'user' + clientCount;
	io.emit('enter',socket.nickname + ' comes in')

	socket.on('message', function (str) {
		io.emit('message', socket.nickname + 'says:' + str)
	})

	socket.on('disconnect', function () {
		io.emit('leave', socket.nickname + ' left')
	})
})

// Scream server example: "hi" -> "HI!!!"
/*
var server = ws.createServer(function (conn) {
	console.log("New connection");
	clientCount++;
	conn.nickname = 'user' + clientCount;
	var mes = {};
	mes.type = "enter";
	mes.data = conn.nickname + ' comes in';
	broadcast(JSON.stringify(mes));
	conn.on("text", function (str) {
		console.log("Received "+str);
		var mes = {};
		mes.type = "message";
		mes.data = conn.nickname + 'says:' + str;
		broadcast(JSON.stringify(mes));
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		var mes = {};
		mes.type = "leave";
		mes.data = conn.nickname + ' left';
		broadcast(JSON.stringify(mes));
	})
	conn.on("error",function (err) {
		console.log("handle err");
		console.log(err);
	})
}).listen(PORT);
console.log("webSocket server listening on port" + PORT);

function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str);
	})
}*/
