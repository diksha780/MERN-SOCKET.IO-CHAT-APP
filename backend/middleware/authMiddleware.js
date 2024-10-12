// 1 import
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const expressAsyncHandler = require("express-async-handler");

// 2 create middleware, middleware have req,res and next to move on to next operation
const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // if these 2 conditions satisfy, that means we got the token and then,
    try {
      // as token appears like this: Bearer gdhfgkg,
      // then split the token(remove Bearer and only taken token part)

      token = req.headers.authorization.split(" ")[1];

      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // user variable inside of this request object
      // return the id without the passowrd
      req.user = await User.findById(decoded.id).select("-password");
      //   and move on to next operation
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  //   if above token wali condition is not satisfied, then do this
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//  3. export protect and also import this protect middleware in  userRoutes.js
module.exports = { protect };
