const Chat = require("../Models/chat")
const chatController ={}

chatController.saveChat = async(message,user)=>{
    const newMessage = new Chat({
        chat:message,
        user:{
            id:user._id, // _id인 이유는 몽고DB에서 데이터가 생길 때마다 부여해주는 주민번호라고 생각하자. 약간 mySQL에서 inserId 같은 느낌인듯?
            name:user.name
        },
        room: user.room, // 메세지에 채팅방 정보도 저장
    });
    await newMessage.save();
    return newMessage;

}

module.exports = chatController;