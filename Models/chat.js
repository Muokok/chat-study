const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
    chat: String,
    user: {
        id: {
            type: mongoose.Schema.ObjectId, // 이 부분을 Number로 바꾸고 controller에서 id 넣는 부분도 Number로 맞쳐줘야 데이터가 잘 들어감.
            ref: "User",
        },
        name: String,
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
    },

    },
    { timestamp: true}
);
module.exports = mongoose.model("Chat", chatSchema);