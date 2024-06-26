const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    usersInChat: {
        type: Array,
        required: true
    },
    encryptionKey: {
        type: String,
        required: true
    },
    messagesArray: {
        type: Array
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;