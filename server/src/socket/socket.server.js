import { Server } from 'socket.io'

let io;

export function initSocket(httpServer) {
    
    io  = new Server(httpServer, {
        cors :{
            origin : "http://localhost:5173",
            credentials : true
        }
    })

    console.log(`Socket Server is Connected`)

    io.on("connection", (socket) => {
        console.log(`User is connected : ${socket.id}`)
    })

}

export function getIO(){

    if(!io){
    throw new Error("Socket io isn't initialized");
    }

    return io

}