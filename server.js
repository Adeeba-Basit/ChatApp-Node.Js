const io = require("socket.io")(8000,{
    cors:"*"
})

var users = {}
io.on("connection",socket=>{
    socket.on("user-joined",name=>{
          users[socket.id] = name
          socket.broadcast.emit("new-user-joined",name)
          console.log(users);
    })
    socket.on("send",(message)=>{
        socket.broadcast.emit("recieve",{name:users[socket.id],message:message})
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-left",users[socket.id])
        delete users [socket.id]
    })
})