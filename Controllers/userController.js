// 유저 관련 코드
const User = require("../Models/user");
const userController ={};
userController.saveUser = async (userName,socketId)=>{ // 유저를 저장하는 메소드
    let user = await User.findOne({name:userName});  //이미 있는 유저인지 확인

    if(!user){    //없다면 새로 유저정보 만들기
        user = new User({
            name:userName,
            token: socketId,
            online: true
        });
    }
    //이미 있는 유저라면 연결정보 token값만 바꿔주기
    user.token = socketId;
    user.online= true;

    await user.save();
    return user;
};

userController.checkUser = async (socketId)=>{ // socketId로 유저를 찾는 메소드
    const user = await User.findOne({token: socketId});
    if(!user) throw new Error("user not found");
    return user;

}
module.exports = userController;