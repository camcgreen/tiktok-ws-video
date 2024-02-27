const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3001 })

wss.on('connection', (ws) => {
  console.log('new client connected')
  ws.on('message', (data) => {
    console.log('received message', data.toString())
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString())
      }
    })
  })
  ws.on('close', () => {
    console.log('client disconnected')
  })
})
