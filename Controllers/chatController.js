const Chat = require("../Models/chat")
const chatController ={}

chatController.saveChat = async(message,user)=>{
    const newMessage = new Chat({
        chat:message,
        user:{
            id:user._id, // _id인 이유는 몽고 DB에서 데이터가 생길 때마다 부여해주는 주민번호라고 생각하자. 약간 mySQL에서 inserId 같은 느낌인듯?
            // 여기에 user._id를 하던, user.id를 하던 65cc93c2af2a61d28ae72014 << 이런 값이 DB에 저장됨. 이 부분을 mySQL의 유저 id를 넣어야 함.
            name:user.name
        },
        room: user.room, // 메세지에 채팅방 정보도 저장

    });


    console.log("user.room = "+user.room); //user.room = 65cc927c691ca73e2b0e1281

    await newMessage.save();
    return newMessage;

}

module.exports = chatController;