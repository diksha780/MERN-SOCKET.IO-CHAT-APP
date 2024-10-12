const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");

// 1 routers that we make inside this api endpoint: /api/chat

// a. route to create or access the chat
// only the user who is logged in can access this route, non loggedin users cant
// accessChar is the name of this route
router.route("/").post(protect, accessChat);

// b. this route fetch all the chats from database for that particular user
router.route("/").get(protect, fetchChats);

// c. route to create a group chat
router.route("/group").post(protect, createGroupChat);
// // d.route to rename the particular group
// // as we are updating a value, it will be a put request
router.route("/rename").put(protect, renameGroup);

// // e. route is you want to leave the group, or to remove someone from the group
router.route("/groupremove").put(protect, removeFromGroup);

// // f.if you want to add someone in the group
router.route("/groupadd").put(protect, addToGroup);

// export and also import in server.js
module.exports = router;
