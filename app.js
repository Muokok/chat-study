const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

const Room = require("./Models/room");

const cors = require("cors");
app.use(cors()); // 어떤 주소로든 접근을 허용한다.

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("connected to MongoDB"));
// then은 mongoose.connect가 실행됐다면 console.log를 수행하라는 의미

app.get("/", async (req,res) =>{
    // "/" 경로로 get 요청시 채팅방 생성
    Room.insertMany([
        {
            room: "자바스크립트 단톡방",
            members: [],
        },
        {
            room: "리액트 단톡방",
            members: [],
        },
        {
            room: "NodeJS 단톡방",
            members: [],
        },
    ])
        .then(() => res.send("Chat room created"))
        .catch((error) => res.send(error));
});
// 이 부분에서 에러가 났었는데, compass의 indexs 부분에서 members_id를 지우니 잘 됐음. 이유는 모름;;

module.exports = app;