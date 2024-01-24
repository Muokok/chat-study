// 웹 소켓(통신)과 관련된 코드 모음
const userController = require("../Controllers/userController")
const chatController = require("../Controllers/chatController")
const {now} = require("mongoose");
module.exports = function (io){ //io를 index.js에서 매개변수로 받아옴
    // 소켓에는 말하는 함수 .emit(), 듣는 함수 .on()이 있다.
    io.on("connection", async(socket)=>{ // 연결된 사람의 정보를 socket 매개변수로 받아 온다.
        console.log("client is connected", socket.id, now()); // 소켓의 id값도 함께 출력해준다.
        socket.on("login",async (userName,callBack)=>{
            //"login"으로 들었을 때 실행할 코드 부분 즉, 유저가 로그인을 했을 때 실행하는 코드다.
            // 받은 유저정보를 저장하고 소켓 아이디 정보를 저장한다.
            //유저 정보에 관한 코드는 io.js(통신 관련 파일)에 있을 필요가 없기에 따로 빼줌

            try {
                const user = await userController.saveUser(userName,socket.id);
                const welcomeMessage ={ // 특정 유저가 접속했다는 메세지를 생성
                    chat:`${user.name} is joined to this room`,
                    user: { id: null, name: "system"}, // 여기 id는 백엔드에서 넘겨주는 값이다.
                };
                io.emit("message", welcomeMessage); // 접속 메시지를 모두에게 뿌려준다.
                callBack({ok:true, data:user});
            }catch (error){
                callBack({ok:false, data:error.message});
            }

        });
        //프론트로부터 sendMessage라는 말을 들었을 때 message(메시지 내용)과 callback함수가 함께 온다.
        socket.on("sendMessage", async(message,cb)=>{
            try {
                // 저장해야 할 정보는 채팅 내용, 유저 id와 이름인데, 유저 정보는 socket id로 찾는다.
                const user = await userController.checkUser(socket.id);
                // 이후 메시지 관련 정보를 저장한다.
                const newMessage = await chatController.saveChat(message,user);
                // A로부터 받은 내용을 채팅방에 있는 모든 유저들이 볼 수 있도록 하기 위해 모두에게 보내줘야 한다.
                io.emit("message", newMessage); // 서버가 프론트에게 소켓을 통해 데이터를 뿌려줌.
                cb({ok:true});
            }catch (error){
                cb({ok:false, data:error.message});
            }
        })

        socket.on("disconnect",()=>{ // 소켓 연결이 끊겼을 때 알려준다.
            console.log("user is disconnected");
        });
    });
};