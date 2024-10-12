// this file contains info of users, chatName, isGroupChat, groupAdmin, latestMessage
const mongoose = require("mongoose");
// inside this, we define our object
// We are creating a mode called chatModel
// we are maing logical schema(schema - 3 types: physical,logical, view schema)
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    // trim removes space from left and r of string
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // it contain id to that particular user(make refernce to that particular user using this ObjectId)
        ref: "User", //refernce to user model
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      //providing the reference to it with ObjectId
      ref: "Message", //refering to the particular part of database where message is stored
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  // a tymstamp is added everytime by mongoose , when a new chat is added
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
