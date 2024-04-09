//it is server file ---------------------------------

const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => console.log(`server on the port :  ${PORT} `))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

// -------------socket io   connection in server---------------

let socketConected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
    console.log(socket.id)
    socketConected.add(socket.id)
    // document.getElementById("users-info").innerHTML = socket.id + " isconnected";


    io.emit('user-info', socket.id)

    io.emit('clients-total', socketConected.size)

    socket.on('disconnect', () => {
        // document.getElementById("users-info").innerHTML = socket.id + " is disconnected";
        console.log("socket is disconected", socket.id)
        // alert("socket is disconected", socket.id)
        socketConected.delete(socket.id)
        io.emit('clients-total', socketConected.size)

    })

    socket.on('message', (data) => {

        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })


    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    })
}