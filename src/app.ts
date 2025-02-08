import { Server } from "./presentation/server";


const server = new Server();
server.start().catch((error)=>{
    console.log(`Error while the server ${error}`)
})