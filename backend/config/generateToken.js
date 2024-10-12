//1. install jsonwebtoken package
// npm i jsonwebtoken

// 2. import jwt
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // 3. sign a new token with that particular new id
  //   also we have to have a jwt secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // 4. in how much time this token expires
    expiresIn: "30d",
  });
};

// 5. export module
module.exports = generateToken;
// 6. import it in userController
