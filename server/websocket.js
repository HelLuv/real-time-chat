const webSocket = require('ws');
const PORT = 5000;
const webSocketServer = new webSocket.Server({
        port: PORT,

    }, () => console.log(`server started on port ${PORT}`)
);

webSocketServer.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);

        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});


const broadcastMessage = (message) => {
    webSocketServer.clients.forEach(client => {
        client.send(JSON.stringify(message))
    });
};

