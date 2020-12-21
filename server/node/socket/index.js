const IO = require('socket.io')

const creatSocket = (server) => {
  const io = IO(server, {
    cors: {
      origin: '*'
    }
  })
  io.on('connection', (socket) => {
    console.log('已连接')
    socket.on('disconnect', () => {
      console.log('端开链接')
    })
  })
}

module.exports = creatSocket
