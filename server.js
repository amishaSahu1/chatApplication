const express = require('express')
const { dirname } = require('path')

const app =express()
const http= require('http').createServer(app)

const PORT = process.env.port || 3000

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res)=>{
 res.sendFile(__dirname + '/index.html')
})

//socket
const io = require('socket.io')(http)

const user = {};
io.on('connection', (socket)=>{
    socket.on('new-user-joined', name =>{
       // console.log('new user', name)
        console.log("connected!!")
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })
    socket.on('send' , message=>{
        socket.broadcast.emit('receive', {message: message, name:user[socket.id]})
    })
    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left', user[socket.id]);
        delete user[socket.id];
    })
})