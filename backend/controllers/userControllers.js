// 1: if there is any error in this ccontroller,we use package Expres async handler
// install npm i express-async-handler
// import async handler and wrap async function in it
const expressAsyncHandler = require("express-async-handler");

//5: import User(model) that we created
const User = require("../models/userModel");
// 3 import generateToken from generateToken.js
const generateToken = require("../config/generateToken");

// 2:
const registerUser = expressAsyncHandler(async (req, res) => {
  // 3: destructure data
  const { name, email, password, pic } = req.body;
  //4: throw an error if any of above keys(data) is not filled by user/client
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please Enter all the Feilds");
  }

  //  6: check if the user already exists in our database or not
  //   search for email if it exists in database or not
  const userExists = await User.findOne({ email });
  //   here we are using User model(userSchema) and the data that we created inside it
  //   findOne is the query that we use in mongodb

  //   7. as email must be unique, so if email exists, it throws error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //   8. otherwise , create a new user , if it doesnot exist
  // user.create is an query that query our databse and create a new user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  //   9. if every thing is done successfulyy, then send below data to user
  // 201 means success

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      // generate JWT token when new user registers and send it to user
      token: generateToken(user._id),
    });
  }
  // 10. if it fails, then say Failed to Create the User
  else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});
// 13 ***********create suthUser functin ********
const authUser = expressAsyncHandler(async (req, res) => {
  // 1 take email and password to login our user
  const { email, password } = req.body;
  //2 check if user exists in our database or not
  const user = await User.findOne({ email });

  // 3. if user exists and the password matches with that in the databse,
  // also add functionality to match password
  // create matchPassword function in userModel.js
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user.id),
    });
  }

  //4 else throw an error id invalid id or password
  else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  // 5. also when a new user is registered, its password should not be stored as plane
  // text in the database, but in the encrypted form,
  // so write loig to encrypt in decrypt the password in userModel.js file
});

// ...1 create allUsers controller
// our endpoint is /api/user
// if we want to send data to backend through query, use do like this
// /api/user/search=diksha
const allUsers = expressAsyncHandler(async (req, res) => {
  // to send data to backend using query, we use req.query
  const keyword = req.query.search
    ? {
        $or: [
          // if the query inside this search matches with the name of the user
          // "i" means case insensitive
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {}; // if not any query satisfies, then

  // query the databse
  // we want to search all the other users(search results) except the user who is currently logged in
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  // req.user._id ...is the id of current user
  // except this current user, return me users in search result

  // to get the current user id, we need to authorize the current logged in user, for which, user needs to login in and ptovide us json web token
  res.send(users);

  // console.log(keyword);
});

// ...2 export allUser and import in userRouter
// 11. export it
module.exports = { registerUser, authUser, allUsers };

// 12 import this in userRoutes
