import app from './src/app.js'
import connectToDB from './src/config/database.js'
import http from 'http'
import { initSocket } from './src/socket/socket.server.js';

connectToDB()

const httpServer = http.createServer(app)

initSocket(httpServer)

httpServer.listen(3000, () => {
    console.log("server is running on port : 3000");
})