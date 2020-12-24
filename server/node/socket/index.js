const IO = require('socket.io')

const creatSocket = (server) => {
  const io = IO(server, {
    cors: {
      origin: '*'
    }
  })
  io.on('connection', (socket) => {
    console.log('已连接')
    console.log(Object.keys(socket));
    let handshake = socket.handshake
    // console.log(handshake)
    socket.on('disconnect', () => {
      console.log('端开链接')
    })
    socket.on('msg', (from, msg) => {
      console.log(from)
      console.log(msg)
    })
  })
}

module.exports = creatSocket
