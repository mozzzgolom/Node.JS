const http = require('http')
const socket = require('socket.io')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const pathHTML = path.join(__dirname, './index.html')
    const readStream = fs.createReadStream(pathHTML, {
        encoding: 'utf-8'
    })
    readStream.pipe(res)
  //  res.end()
})

const io = socket(server)
let usersCount = 0
io.on('connection', client => {
    usersCount++
    client.emit('user-init', {'usersID': client.id})
    client.emit('users-count', {'usersCount': usersCount, 'usersID': client.id, 'msg': 'вошел в чат'})
    client.broadcast.emit('users-count', {'usersCount': usersCount, 'usersID': client.id, 'msg': 'вошел в чат'})
    console.log("connection", client.id)
    client.on('client-msg', ({message}) => {
        client.emit('server-msg', {message, 'userID': client.id})
        client.broadcast.emit('server-msg', {message, 'userID': client.id})
    })

    client.on('disconnecting', () => {
        console.log('disconnect')
        usersCount--
        client.emit('users-count', {'usersCount': usersCount, 'usersID': client.id, 'msg': 'покинул чат'})
        client.broadcast.emit('users-count', {'usersCount': usersCount, 'usersID': client.id, 'msg': 'покинул чат'})
    })
})


server.listen(7777)