const WebSocket = require('ws')
const http = require('http')


const wssFunction = (server) => {
  const wss = new WebSocket.Server({ server });

  // Configurar conexão WebSocket
  wss.on('connection', (ws) => {
    console.log('Nova conexão WebSocket.');

    // Evento para lidar com mensagens recebidas
    ws.on('message', (message) => {
      console.log(`Mensagem recebida: ${message}`);
    });

    // Evento quando a conexão é fechada
    ws.on('close', () => {
      console.log('Conexão WebSocket fechada.');
    });
  });
}

module.exports = wssFunction