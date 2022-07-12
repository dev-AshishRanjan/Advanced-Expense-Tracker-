const express=require('express');
const app=express();
const http=require('http');

const server=http.createServer(app);
const port =process.env.PORT || 3001;
const {Server} =require("socket.io");
const cors = require("cors");

var storage=[{username:"initial",password:"i",data:[{type:"Income",category:"Salary",id:"1",date:"2022-5-5",price:"50"}]}];

const Contact=[];

app.use(cors());

const io= new Server(server,{
    cors: {
        origin: 'https://income144.netlify.app',
        method: ["GET","POST"],
        credentials: true
    },
});

io.on("connection", (socket)=>{
    console.log(`user connected : ${socket.id}`);
    socket.on("pushData",(data)=>{
        console.log(data);
        storage=data;
        socket.broadcast.emit("receive_message",storage);
    });
});

app.get("/",(req,res)=>{
    res.send(JSON.stringify(storage));
});

server.listen(port,()=>{
    console.log("**Server is running**");
})