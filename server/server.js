const io = require('socket.io')(3000,{
    cors: {
        origin:['http://localhost:1234']
    }
})

io.on('connection', socket=>{
    console.log(socket.id)
    socket.on('send-message',(message,room)=>{
        if(room == ''){
        socket.broadcast.emit('receive-message',`${socket.id} : ${message}`);
        }
        else{
            socket.broadcast.to(room).emit('receive-message',`${socket.id} : ${message}`);
        }
    });
    socket.on('join-room',room=>{
        socket.join(room)
    })
})