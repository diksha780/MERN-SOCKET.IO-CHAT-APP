//1.i in this file, we will add all routes that are related to the user
const express = require("express");
const { registerUser } = require("../controllers/userControllers");
const { authUser, allUsers } = require("../controllers/userControllers");

//2. create instance of router from express
const router = express.Router();
// from comment section
router.use(express.json());

// import protect from authMiddleware.js
const { protect } = require("../middleware/authMiddleware");
// 5. import registerUser
// router.route("/").post(registerUser);

//3. use this router to create different routes

router.route("/").post(registerUser);
router.post("/login", authUser);

// create this authUser function  in file userControllers

// ****create user searching API endpoint
// 1 create route
// ..1 add allUser from authMiddleware
router.route("/").get(protect, allUsers);
// 2 create    controller in userControllerjs

// 4.export it
module.exports = router;
