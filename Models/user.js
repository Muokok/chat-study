const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
//Schema는 내가 받을 데이터가 이렇게 생겼다~ 라는 정보를 담아둔 설계도라 보면 된다.
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },

    token: { // 연결 id 정보
        type: String,
    },

    online: { // 유저가 online인지 상태 보여주기 위함. (본 강의에서는 다루지 않지만 스스로 해보는 걸 추천)
        type: Boolean,
        default: false,
    },

    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
    },
});
module.exports = mongoose.model("User", userSchema);