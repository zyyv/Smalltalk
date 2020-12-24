const mongoose = require('mongoose')
const Mongodb_Config = {
  user: 'admin',
  password: 'admin',
  host: process.env.NODE_ENV === 'development' ? 'localhost' : '47.103.219.72',
  port: '27017',
  db: 'SmallTalk'
}
const Mongodb_Path = `mongodb://${Mongodb_Config.user}:${Mongodb_Config.password}@${Mongodb_Config.host}:${Mongodb_Config.port}/${Mongodb_Config.db}`

// 连接
const Connect = () => {
  mongoose.connect(Mongodb_Path, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('\033[33mmongodb connect success\033[0m')
  }).catch(err => {
    console.log(err)
  })
}

module.exports = {
  Mongodb_Config,
  Mongodb_Path,
  Connect
}