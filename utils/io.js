// 웹 소켓(통신)과 관련된 코드 모음
const userController = require("../Controllers/userController")
module.exports = function (io){ //io를 index.js에서 매개변수로 받아옴
    // 소켓에는 말하는 함수 .emit(), 듣는 함수 .on()이 있다.
    io.on("connection", async(socket)=>{ // 연결된 사람의 정보를 socket 매개변수로 받아 온다.
        console.log("client is connected", socket.id); // 소켓의 id값도 함께 출력해준다.
        socket.on("login",async (userName,callBack)=>{
            //"login"으로 들었을 때 실행할 코드 부분, 받은 유저정보를 저장하고 소켓 아이디 정보를 저장하는 부분임
            //유저 정보에 관한 코드는 io.js(통신 관련 파일)에 있을 필요가 없기에 따로 빼줌
            //try {
                const user = await userController.saveUser(userName,socket.id);
                callBack({ok:true, data:user});
            //}catch (error){
              //  callBack({ok:false, data:error.message});
            //}
        });
        socket.on("disconnect",()=>{ // 소켓 연결이 끊겼을 때 알려준다.
            console.log("user is disconnected");
        });
    });
};