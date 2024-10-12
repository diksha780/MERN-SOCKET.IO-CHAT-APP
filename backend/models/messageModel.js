const mongoose = require("mongoose");

// create an object inside messageModel

const messageModel = mongoose.Schema(
  {
    // schema contains 3 things:
    // name or id of sender
    //content of message
    //   the refernce to the chat to which it belongs

    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chats: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);
// now export the model after creating it
const Message = mongoose.model("Message", messageModel);
module.exports = Message;
