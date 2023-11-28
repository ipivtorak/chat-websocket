const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

const connections = new Set();

let messages = [];

const wsHandler = (ws) => {
  connections.add(ws);

  ws.send(JSON.stringify(messages));

  ws.on('message', (message) => {
    connections.forEach((conn) => conn.send(message));
    if (messages.length >= 10) messages.shift();
    messages.push(JSON.parse(message));
  });

  ws.on('close', () => {
    connections.delete(ws);
  });
}

app.ws('/chat', wsHandler);

app.use(express.static('build'));

app.listen(8080);
