const expressAsyncHandler = require("express-async-handler");

const Chat = require("../models/chatModel");
const User = require("../models/userModel");
// 1. create API to acess the chats
const accessChat = expressAsyncHandler(async (req, res) => {
  // inside this we take user id with which we'll create chat
  const { userId } = req.body;
  //   if chat with this userId exists, then return this, otherwise create that chat

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  //   check if chat exists with this user
  var isChat = await Chat.find({
    // chat should not be a group chat, so
    isGroupChat: false,
    $and: [
      // id of current logged in user and the user with specific id with whom we want to chat
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
      // users is the array in chatModel.js
      // req.user._id => id of current logged in user
      // userId => second user's id
      // for isChat to exist, both above conditions must be true
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  // give any information abput the vurrent user except the password
  // latestMessage is an object in chatModel.js
  // give all information about this latestMessage

  // inside isChat, we have all the final data for our chat
  // isChat is an array
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  // as the chat only exists between two users, length of chat is 1 always
  // is such chat exists, chat is sent
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// ****Create an API to fetch all the chats of the particular users

const fetchChats = expressAsyncHandler(async (req, res) => {
  // check which user is logged in and query for the chats of that user stored in the database
  // we'll search inside the chat array (in chatModel.js =>users[]) in which all the chats are present in the databse and
  // we'll return all those chats of which that partivular user is part of
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      // now sort chats from New to Old
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        // return this to our user
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// 3.*********create group chat
// we'll take a bunch (array)of users from body and create a group name
const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.send(400).send({ message: "Please fill all the fields" });
  }
  var users = JSON.parse(req.body.users);
  // group must have atleast 2 users

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  // group chat is created for the current logged in user and the other users in suggestions
  // users is an array of all the registered users
  // req.user is the current logged in user
  users.push(req.user);
  try {
    // create a new chat
    const groupChat = await Chat.create({
      // a group chat has following things
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      // group admin is me(current logged in user)
      groupAdmin: req.user,
    });

    // now fetch the group chat from database and send it to the user

    const fullGroupChat = await Chat.findOne(
      { _id: groupChat._id }
      // _id: groupChat._id=> it is the id of the group chat that is created
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// 4.*****create controller to rename group name

const renameGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    // return updated value
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  // if nothing updated, send error
  if (!updatedChat) {
    res.status(400);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// 5.*****create controller to add user in group
// we neet two things: chatId (the chat in which user is added) and userId(user to be added)
const addToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      // add new user to users array
      $push: { users: userId },
    },
    // update the array
    { new: true }
  )
    // onece user is successfully added, populate users information
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  // if nothing added, give error
  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

// 6.*****create controller to remove user from group

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      // add new user to users array
      $pull: { users: userId },
    },
    // update the array
    { new: true }
  )
    // onece user is successfully removed, populate users information
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  // if nothing added, give error
  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// export renameGroup and import in chatRoutes.js
//export accessChat and import in chatRoute.js
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
// inside chatRoutes.js,, import fetchChats
