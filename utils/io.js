// 웹 소켓(io)과 관련된 함수 모음

module.exports = function (io){ //io를 index.js에서 매개변수로 받아옴
    // 소켓에는 말하는 함수 .emit(), 듣는 함수 .on()이 있다.
    io.on("connection", async(socket)=>{ // 연결된 사람의 정보를 socket 매개변수로 받아 온다.
        console.log("client is connected", socket.id); // 소켓의 id값도 함께 출력해준다.


        socket.on("disconnect",()=>{ // 소켓 연결이 끊겼을 때 알려준다.
            console.log("user is disconnected");
        });
    });
};