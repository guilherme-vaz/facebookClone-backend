/* eslint-disable prettier/prettier */
import Ws from 'App/Services/Ws'

Ws.start((socket) => {
  socket.on('passarinho', () => {
    console.log('deu certo!')
  })
})
